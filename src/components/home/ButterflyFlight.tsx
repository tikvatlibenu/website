'use client'

import { useEffect } from 'react'
import './butterfly.css'

/**
 * Бабочка-знак перелетает с hero-фото на первую секцию при скролле.
 *
 * Один перелёт, scroll-scrub: прогресс полёта — чистая функция прокрутки,
 * поэтому любая скорость скролла корректна по построению. Профильная фаза
 * включается на взлёте и не выключается — посадка тоже «боком», на край
 * последней буквы заголовка секции (элемент [data-perch]). Дальше бабочка
 * сидит на заголовке и уезжает вместе со страницей.
 *
 * Крылья клонируются из SVG-знака в hero (ButterflyDecor), так что рисунок
 * всегда совпадает с логотипом. prefers-reduced-motion полностью отключает
 * полёт и оставляет статичный знак.
 */
export function ButterflyFlight() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let fly: HTMLDivElement | null = null
    let orig: HTMLElement | null = null

    // Даём hero отрендериться (клиентские DS-компоненты монтируются вместе с нами).
    const startTimer = setTimeout(() => {
      orig = document.querySelector<HTMLElement>('.tl-hero__butterfly')
      const perchEl = document.querySelector<HTMLElement>('[data-perch]')
      if (!orig || !perchEl) return
      const srcSvg = orig.tagName === 'svg' ? (orig as unknown as SVGSVGElement) : orig.querySelector('svg')
      if (!srcSvg) return

      const NS = 'http://www.w3.org/2000/svg'
      // Ближняя к камере пара крыльев — розово-жёлто-оранжевая половина знака.
      const NEAR = ['pink', 'yellow', 'orange']
      const wingLayer = (near: boolean) => {
        const s = document.createElementNS(NS, 'svg')
        s.setAttribute('viewBox', srcSvg.getAttribute('viewBox') ?? '0 0 571 469')
        s.setAttribute('class', 'bfly-wing')
        const g = document.createElementNS(NS, 'g')
        g.setAttribute('fill-rule', 'evenodd')
        for (const p of srcSvg.querySelectorAll('path')) {
          const cls = p.getAttribute('class') || ''
          if (NEAR.some((n) => cls.includes(n)) === near) g.appendChild(p.cloneNode(true))
        }
        s.appendChild(g)
        return s
      }
      const wingNear = wingLayer(true)
      const wingFar = wingLayer(false)

      fly = document.createElement('div')
      fly.id = 'fly-butterfly'
      const view = document.createElement('div')
      view.className = 'bfly-view'
      const bodyEl = document.createElement('div')
      bodyEl.className = 'bfly-body'
      bodyEl.appendChild(wingFar)
      bodyEl.appendChild(wingNear)
      view.appendChild(bodyEl)
      fly.appendChild(view)
      document.body.appendChild(fly)
      orig.style.visibility = 'hidden'

      const size = () => (innerWidth < 720 ? 44 : 64)
      const smoothstep = (t: number) => t * t * (3 - 2 * t)
      const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
      const mix = (a: number, b: number, e: number) => a + (b - a) * e

      const P = 2.6
      const PH0 = 1.8 // ритм «серия махов / глайд»
      let u = 0 // сглаженный прогресс перелёта 0..1
      let phase = 0
      let last = performance.now()

      const frame = (now: number) => {
        if (!fly || !orig) return
        const dt = Math.min(0.05, (now - last) / 1000) || 0.016
        last = now
        const t = now / 1000
        const w = size()
        const h = Math.round((w * 469) / 571)
        fly.style.width = w + 'px'
        fly.style.height = h + 'px'
        fly.style.perspective = Math.round(w * 4) + 'px'

        // Опорные точки: шарнир знака на hero и точка посадки на заголовке секции.
        const r0 = orig.getBoundingClientRect()
        const rp = perchEl.getBoundingClientRect()
        const h0x = r0.left + r0.width * 0.5139
        const h0y = r0.top + r0.height * 0.5195
        const h1x = rp.left + rp.width / 2
        const h1y = rp.top + w * 0.05
        if (!isFinite(h0x) || !isFinite(h1y) || Math.abs(rp.top - r0.top) < 40) {
          raf = requestAnimationFrame(frame)
          return // layout ещё не готов
        }

        // Scrub: прогресс — функция скролла; сглаживание съедает ступеньки
        // колеса, ограничение скорости превращает прыжок по якорю в мини-перелёт.
        const y0 = r0.top + scrollY + r0.height * 0.5195
        const y1 = rp.top + scrollY
        const focus = scrollY + innerHeight * 0.35
        const uRaw = clamp((focus - y0) / (y1 - y0), 0, 1)
        let du = (uRaw - u) * Math.min(1, dt * 8)
        du = clamp(du, -2.4 * dt, 2.4 * dt)
        u += du

        // Поза: взлёт (t1), приземление (t2); профиль (pf) включается и остаётся.
        const t1 = smoothstep(clamp((u - 0.04) / 0.22, 0, 1))
        const t2 = smoothstep(clamp((u - 0.74) / 0.22, 0, 1))
        const alive = t1 * (1 - t2)
        const pf = smoothstep(clamp((u - 0.28) / 0.1, 0, 1))

        // Две «сидячие» позы: старт — знак на hero (вид сверху),
        // финиш — профиль, присевший на край буквы.
        const pitch = mix(mix(86, mix(62, 24, pf), t1), 26, t2)
        const yaw = mix(mix(0, mix(8, 12, pf), t1), 9, t2)
        const up = mix(mix(58, mix(48, 18, pf), t1), 30, t2)
        const dn = mix(mix(98, mix(88, 50, pf), t1), 52, t2)
        const rate = mix(mix(0.9, mix(2.2, 2.6, pf), t1), 0.55, t2)
        const bobAmp = mix(mix(4, 14, t1), 1.5, t2)
        let sc = mix((r0.width || w) / w, 1, t1)
        sc = mix(sc, 0.72, t2)

        // Траектория: дуга между опорами + лёгкий снос ветром в полёте.
        const lift = Math.min(90, Math.abs(y1 - y0) * 0.15 + 30)
        const pathAt = (uu: number) => {
          const s2 = smoothstep(uu)
          return { x: mix(h0x, h1x, s2), y: mix(h0y, h1y, s2) - Math.sin(uu * Math.PI) * lift }
        }
        const su = smoothstep(u)
        const ws = w / 88
        const wx = alive * (8 * Math.sin(0.53 * t + 1.7) + 5 * Math.sin(0.91 * t)) * ws
        const wy = alive * (6 * Math.sin(0.61 * t + 0.4) + 4 * Math.sin(1.13 * t + 2.1)) * ws

        // Взмах: серии махов и глайд; пока идёт скраб, глайд отключён —
        // в движении бабочка машет всегда, и чем быстрее летит, тем чаще.
        const uSpd = Math.min(1, Math.abs(du) / dt / 0.6)
        phase += rate * (1 + 0.35 * uSpd) * dt * 2 * Math.PI
        const uEnv = (Math.sin((2 * Math.PI * t) / P + PH0) + 1) / 2
        const gate = Math.max(clamp((uEnv - 0.22) / (0.5 - 0.22), 0, 1), uSpd)
        const env = 1 - alive * (1 - (0.35 + 0.65 * gate))
        const mid = (up + dn) / 2
        const half = (dn - up) / 2
        const center = mid + alive * (1 - gate) * (mix(70, 40, pf) - mid)
        const s = Math.sin(phase + 0.35 * alive * Math.sin(phase))
        const eased = Math.sign(s) * Math.pow(Math.abs(s), 0.8)
        // Вблизи мёртвой зоны камеры (a + pitch ~ 90) амплитуда гасится,
        // а само пересечение проходит одним быстрым «щелчком» крыла.
        const ampGate = clamp((Math.abs(mid + pitch - 90) - 8) / 16, 0.2, 1)
        let a = center + eased * half * env * ampGate
        const g = a + pitch - 90
        if (Math.abs(g) < 12) a = 90 - pitch + (g >= 0 ? 12 : -12)

        const flyBob = -(0.5 + 0.5 * Math.sin(phase - 1.2)) * (0.4 + 0.6 * gate) + (1 - gate) * 0.9
        const sitBob = 0.5 * Math.cos(phase)
        const bobY = bobAmp * (alive * flyBob + (1 - alive) * sitBob)

        const cx = mix(h0x, h1x, su) + wx
        const cy = mix(h0y, h1y, su) - Math.sin(u * Math.PI) * lift + wy + bobY

        // Экранный курс: наклон hero-знака выравнивается на взлёте;
        // в полёте нос доворачивается по касательной, на посадке — фикс. наклон.
        const lean = alive * clamp((h1x - h0x) * 0.03, -12, 12)
        const spinBase = -90 - 14 * (1 - t1) + lean
        const pA = pathAt(Math.max(0.02, u - 0.02))
        const pB = pathAt(Math.min(0.98, u + 0.02))
        const th = (Math.atan2(pB.y - pA.y, pB.x - pA.x) * 180) / Math.PI
        const dth = ((th - spinBase + 540) % 360) - 180
        const seatSpin = -78
        const spin = mix(spinBase + dth * pf * 0.55, seatSpin, t2)

        // Корпус: спековый курс вокруг оси тела (наклон, покачивание, клевок).
        const heading =
          90 - 8 * alive + alive * 2.5 * Math.sin(0.7 * t) + alive * ((1 - gate) * 7 + gate * 2.2 * Math.sin(phase - 0.6))

        fly.style.transform = `translate(${cx - w * 0.5139}px, ${cy - h * 0.5195}px) rotate(${spin}deg) scale(${sc})`
        view.style.transform = `rotateX(${pitch}deg) rotateY(${yaw}deg)`
        bodyEl.style.transform = `rotateZ(${heading}deg)`
        ;(wingNear as SVGElement).style.transform = `rotateY(${a}deg)`
        ;(wingFar as SVGElement).style.transform = `rotateY(${180 - a}deg)`

        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }, 400)

    return () => {
      clearTimeout(startTimer)
      cancelAnimationFrame(raf)
      fly?.remove()
      if (orig) orig.style.visibility = ''
    }
  }, [])

  return null
}
