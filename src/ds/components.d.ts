/*
 * Generated from the Tikvat Libenu design-system export (@tikvat-libenu/ui@0.1.0).
 * Do not edit by hand — re-run scripts/convert-design-system.mjs.
 */
import * as React from 'react';

/**
 * Button — from @tikvat-libenu/ui@0.1.0.
 * @replaces button
 */
export interface ButtonProps {
  /** `primary` — pink, the donate / main action (one per view) · `secondary` — navy · `outline` — navy border · `soft` — pale */
  variant?: "soft" | "outline" | "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";
  /** `sm` 40px · `md` 48px · `lg` 56px (hero and donate CTAs). */
  size?: "sm" | "md" | "lg";
  /** Icon before the label (at the right in Hebrew). */
  iconStart?: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  /** Icon after the label. `arrow-forward` flips to point left in RTL. */
  iconEnd?: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  /** Show a spinner and block clicks while an action is in flight. */
  loading?: boolean;
  disabled?: boolean;
  /** Stretch to the container width (mobile CTAs, forms). */
  fullWidth?: boolean;
  /** Render as a link (`<a>`) instead of a `<button>`. */
  href?: string;
  target?: "_blank" | "_self";
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLElement>;
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const Button: React.ComponentType<ButtonProps>;

/**
 * IconButton — from @tikvat-libenu/ui@0.1.0.
 */
export interface IconButtonProps {
  /** Icon to show. */
  icon: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  /** Accessible name — required, because there is no visible text. */
  label: string;
  variant?: "soft" | "outline" | "primary" | "secondary" | "ghost" | "inverse";
  /** `sm` 40px · `md` 48px · `lg` 56px. */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Render as a link instead of a button. */
  href?: string;
  target?: "_blank" | "_self";
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

export declare const IconButton: React.ComponentType<IconButtonProps>;

/**
 * ButterflyDecor — from @tikvat-libenu/ui@0.1.0.
 */
export interface ButterflyDecorProps {
  /** Width in px. */
  size?: number;
  /** `color` — the logo colours · `tint` — one pale colour, for watermark use · `outline` — petal outlines only. */
  variant?: "outline" | "color" | "tint";
  /** Colour used by `tint` and `outline`. */
  tone?: "pink" | "teal" | "yellow" | "navy" | "white";
  /** 0–1 overall opacity. Watermarks read best around 0.08–0.2. */
  opacity?: number;
  /** Rotation in degrees. */
  rotate?: number;
  className?: string;
  /** Use for absolute positioning behind content. */
  style?: React.CSSProperties;
}

export declare const ButterflyDecor: React.ComponentType<ButterflyDecorProps>;

/**
 * Logo — from @tikvat-libenu/ui@0.1.0.
 */
export interface LogoProps {
  /** `full` — butterfly + wordmark + tagline (footer, about page) · `compact` — butterfly + wordmark (site header) · `mark` — */
  variant?: "full" | "compact" | "mark" | "wordmark";
  /** `color` for light backgrounds · `inverse` for navy/dark or photo backgrounds (lettering and the navy wing turn white) ·  */
  tone?: "color" | "inverse" | "mono";
  /** Rendered height in px; width follows the artwork's proportions. */
  height?: number;
  /** Accessible name. */
  title?: string;
  /** When set, the logo becomes a link (usually to the home page). */
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

export declare const Logo: React.ComponentType<LogoProps>;

/**
 * Petal — from @tikvat-libenu/ui@0.1.0.
 */
export interface PetalProps {
  /** Logo colour of the petal. */
  tone?: "pink" | "teal" | "yellow" | "navy" | "orange" | "white";
  /** Which organic outline to use — vary them so neighbouring petals don't look cloned. */
  shape?: "a" | "b" | "c" | "leaf";
  /** Width in px (height is 0.82 × width). Decor petals are big: 200-560px, mostly hidden beyond the edge. */
  size?: number;
  /** Rotation in degrees. */
  rotate?: number;
  /** 0–1. Decorative petals usually sit between 0.12 and 0.3 on tinted sections. */
  opacity?: number;
  className?: string;
  /** Use for absolute positioning (`position`, `insetInlineStart`, …). */
  style?: React.CSSProperties;
}

export declare const Petal: React.ComponentType<PetalProps>;

/**
 * ArticleCard — from @tikvat-libenu/ui@0.1.0.
 */
export interface ArticleCardProps {
  title: string;
  /** Link to the full article — the whole card is clickable. */
  href: string;
  /** Two or three lines of summary; longer text is clamped. */
  excerpt?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Category label shown as a badge over the image. */
  category?: string;
  /** Already-formatted date, e.g. "12 במרץ 2026". */
  date?: string;
  /** e.g. "4 דק׳ קריאה". */
  readingTime?: string;
  /** `vertical` — image on top (grids) · `horizontal` — image at the side (lists, featured post). */
  layout?: "vertical" | "horizontal";
  /** Text of the read-more cue. */
  ctaLabel?: string;
  /** Heading level of the title inside the page outline. */
  headingLevel?: 3 | 4 | 2;
  className?: string;
}

export declare const ArticleCard: React.ComponentType<ArticleCardProps>;

/**
 * Card — from @tikvat-libenu/ui@0.1.0.
 */
export interface CardProps {
  /** `elevated` white + soft shadow · `outlined` hairline border · `tinted` pale logo tint, no shadow · `navy` dark brand car */
  variant?: "navy" | "elevated" | "outlined" | "tinted";
  /** Tint colour for `variant="tinted"`. */
  tone?: "sun" | "sky" | "blush" | "mint";
  /** Inner padding. */
  padding?: "sm" | "md" | "lg" | "none";
  /** Corner radius. */
  radius?: "md" | "lg" | "xl";
  /** Lift on hover — turn on when the whole card is clickable. */
  interactive?: boolean;
  /** Makes the whole card a link. */
  href?: string;
  /** HTML tag when not a link. */
  as?: "div" | "article" | "li" | "section";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const Card: React.ComponentType<CardProps>;

/**
 * DocumentCard — from @tikvat-libenu/ui@0.1.0.
 */
export interface DocumentCardProps {
  /** Document name — "אישור ניהול תקין 2026". */
  title: string;
  /** Who issued it / what it proves — "רשם העמותות". */
  description?: string;
  /** File facts — "PDF · 240KB". */
  meta?: string;
  /** Download / view URL. */
  href: string;
  /** Text of the action. */
  actionLabel?: string;
  icon?: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  /** Marks an officially valid certificate with a teal check. */
  verified?: boolean;
  className?: string;
}

export declare const DocumentCard: React.ComponentType<DocumentCardProps>;

/**
 * EventCard — from @tikvat-libenu/ui@0.1.0.
 */
export interface EventCardProps {
  title: string;
  /** Day of the month for the date tile — "14". */
  day: string;
  /** Month name for the date tile — "אפריל". */
  month: string;
  /** Time range — "16:00–19:00". */
  time?: string;
  /** Where it happens — "פארק הירקון, תל אביב". */
  location?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Show the photo area on top. Defaults to on when `imageSrc` is set; force it on to get the branded placeholder. */
  showImage?: boolean;
  /** Short status badge — "נותרו מקומות", "ההרשמה נסגרה". */
  status?: string;
  statusTone?: "pink" | "teal" | "orange" | "gray";
  /** Link to the event page / sign-up; the whole card becomes clickable. */
  href?: string;
  ctaLabel?: string;
  /** Colour of the date tile. */
  tone?: "pink" | "teal" | "yellow" | "navy";
  headingLevel?: 3 | 4 | 2;
  className?: string;
}

export declare const EventCard: React.ComponentType<EventCardProps>;

/**
 * ServiceCard — from @tikvat-libenu/ui@0.1.0.
 */
export interface ServiceCardProps {
  /** Icon in the petal-shaped chip. */
  icon: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  title: string;
  description: string;
  /** Colour family of the icon chip (and of the `tinted` background). Rotate tones across a row of cards. */
  tone?: "pink" | "teal" | "yellow" | "navy" | "orange";
  /** `plain` — white card · `tinted` — pale tint of the tone. */
  variant?: "plain" | "tinted";
  /** Optional link — adds a read-more cue and makes the whole card clickable. */
  href?: string;
  linkLabel?: string;
  headingLevel?: 3 | 4 | 2;
  className?: string;
}

export declare const ServiceCard: React.ComponentType<ServiceCardProps>;

/**
 * TeamCard — from @tikvat-libenu/ui@0.1.0.
 */
export interface TeamCardProps {
  name: string;
  /** Role — "מנהלת מערך המתנדבים". */
  role: string;
  photoSrc?: string;
  /** One or two sentences. */
  bio?: string;
  /** Shape of the portrait. */
  shape?: "rounded" | "petal" | "circle";
  tone?: "sun" | "sky" | "blush" | "mint";
  align?: "start" | "center";
  className?: string;
}

export declare const TeamCard: React.ComponentType<TeamCardProps>;

/**
 * TestimonialCard — from @tikvat-libenu/ui@0.1.0.
 */
export interface TestimonialCardProps {
  /** The quote itself, without quotation marks. */
  quote: string;
  /** Who said it — "מיכל, אמא של נועם". Use first names only for families. */
  name: string;
  /** Relationship or role — "מלווה בעמותה מאז 2023". */
  role?: string;
  avatarSrc?: string;
  /** `card` white card · `tinted` pale tint · `feature` large centred quote for a full-width band. */
  variant?: "card" | "tinted" | "feature";
  tone?: "pink" | "teal" | "yellow" | "navy";
  className?: string;
}

export declare const TestimonialCard: React.ComponentType<TestimonialCardProps>;

/**
 * VideoCard — from @tikvat-libenu/ui@0.1.0.
 */
export interface VideoCardProps {
  title: string;
  /** Poster frame. Falls back to the branded placeholder. */
  thumbnailSrc?: string;
  /** "2:45" */
  duration?: string;
  /** Link to the video (YouTube etc.). Use `onPlay` instead to open an in-page player. */
  href?: string;
  onPlay?: () => void;
  /** `16/9` landscape · `4/5` for vertical shorts and reels. */
  ratio?: "16/9" | "4/5";
  description?: string;
  className?: string;
}

export declare const VideoCard: React.ComponentType<VideoCardProps>;

/**
 * Badge — from @tikvat-libenu/ui@0.1.0.
 */
export interface BadgeProps {
  /** Logo colour family, or `gray` for neutral meta. */
  tone?: "pink" | "teal" | "yellow" | "navy" | "orange" | "gray";
  /** `soft` pale fill (default) · `solid` strong fill · `outline`. */
  variant?: "soft" | "solid" | "outline";
  size?: "sm" | "md";
  icon?: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  className?: string;
  children?: React.ReactNode;
}

export declare const Badge: React.ComponentType<BadgeProps>;

/**
 * ProgressBar — from @tikvat-libenu/ui@0.1.0.
 */
export interface ProgressBarProps {
  /** Current amount. */
  value: number;
  /** Amount that counts as 100%. */
  max?: number;
  /** Fill colour. */
  tone?: "sun" | "pink" | "teal" | "navy";
  size?: "sm" | "md" | "lg";
  /** Accessible name, e.g. "התקדמות הקמפיין". */
  label: string;
  /** Show the label and the percentage above the bar. */
  showHeader?: boolean;
  className?: string;
}

export declare const ProgressBar: React.ComponentType<ProgressBarProps>;

/**
 * Stat — from @tikvat-libenu/ui@0.1.0.
 */
export interface StatProps {
  /** The number, already formatted — "1,250+", "₪2.4M", "98%". */
  value: string;
  /** What the number counts — "משפחות מלוות". */
  label: string;
  /** Optional extra line under the label. */
  description?: string;
  icon?: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  /** Colour of the number (and icon chip). `yellow` keeps the number navy and paints a yellow marker stroke behind it — yello */
  tone?: "pink" | "teal" | "yellow" | "navy" | "inverse";
  align?: "start" | "center";
  className?: string;
}

export declare const Stat: React.ComponentType<StatProps>;

/**
 * StatGroup — from @tikvat-libenu/ui@0.1.0.
 */
export interface StatGroupProps {
  /** Maximum number of stats per row. */
  columns?: 3 | 4 | 2;
  /** `plain` — no chrome · `card` — white rounded card with a soft shadow · `navy` — dark brand band (use `tone="inverse"` St */
  variant?: "plain" | "navy" | "card";
  /** Thin dividers between the stats. */
  dividers?: boolean;
  className?: string;
  /** `<Stat>` elements. */
  children?: React.ReactNode;
}

export declare const StatGroup: React.ComponentType<StatGroupProps>;

/**
 * Accordion — from @tikvat-libenu/ui@0.1.0.
 */
export interface AccordionProps {
  items: AccordionItem[];
  /** Let several rows stay open at once. */
  allowMultiple?: boolean;
  /** Ids (or indexes as strings) of rows that start open. */
  defaultOpen?: string[];
  /** `separated` — each row is its own rounded card · `plain` — hairline dividers. */
  variant?: "separated" | "plain";
  /** Heading level wrapping each trigger. */
  headingLevel?: 3 | 4;
  className?: string;
}

export declare const Accordion: React.ComponentType<AccordionProps>;

/**
 * CampaignProgress — from @tikvat-libenu/ui@0.1.0.
 */
export interface CampaignProgressProps {
  /** Campaign name — "מחנה הקיץ 2026". */
  title: string;
  description?: string;
  /** Raised so far, in shekels. */
  raised: number;
  /** Target, in shekels. */
  goal: number;
  donors?: number;
  daysLeft?: number;
  currency?: string;
  tone?: "sun" | "pink" | "teal";
  /** Adds a donate button. */
  donateHref?: string;
  donateLabel?: string;
  /** `card` white card · `plain` no chrome · `navy` dark card. */
  variant?: "plain" | "navy" | "card";
  className?: string;
}

export declare const CampaignProgress: React.ComponentType<CampaignProgressProps>;

/**
 * DonationForm — from @tikvat-libenu/ui@0.1.0.
 */
export interface DonationFormProps {
  /** Heading of the widget. */
  title?: string;
  description?: string;
  /** Preset amounts, in shekels. */
  amounts?: number[];
  /** Amount selected at first. 180 (ח״י × 10) is the customary default. */
  defaultAmount?: number;
  /** Show the one-time / monthly switch. */
  showFrequency?: boolean;
  defaultFrequency?: "once" | "monthly";
  /** Let the donor type any amount. */
  allowCustom?: boolean;
  /** What each preset amount makes possible — shown under the amounts as the selection changes. Keys are amounts. */
  impact?: Record<number, string>;
  currency?: string;
  submitLabel?: string;
  /** Reassurance line under the button. */
  secureNote?: string;
  /** Called with the chosen amount and frequency — hand off to the payment page here. */
  onSubmit?: (value: DonationFormValue) => void;
  /** `card` white rounded card · `plain` no chrome (inside your own surface). */
  variant?: "plain" | "card";
  className?: string;
}

export declare const DonationForm: React.ComponentType<DonationFormProps>;

/**
 * Alert — from @tikvat-libenu/ui@0.1.0.
 */
export interface AlertProps {
  /** `info` navy · `success` teal · `warning` orange · `danger` red. */
  tone?: "info" | "success" | "warning" | "danger";
  title?: string;
  /** Override the default icon of the tone. */
  icon?: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  /** Shows a close button and is called when it is pressed. */
  onClose?: () => void;
  className?: string;
  /** The message. */
  children?: React.ReactNode;
}

export declare const Alert: React.ComponentType<AlertProps>;

/**
 * Dialog — from @tikvat-libenu/ui@0.1.0.
 * @replaces dialog
 */
export interface DialogProps {
  /** Whether the dialog is shown. */
  open: boolean;
  /** Called on Escape, on the close button and on a click outside the panel. */
  onClose?: () => void;
  title: string;
  description?: string;
  /** Buttons row at the bottom — primary action first. */
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  /** Decorative petal strip across the top of the panel. */
  accent?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export declare const Dialog: React.ComponentType<DialogProps>;

/**
 * Checkbox — from @tikvat-libenu/ui@0.1.0.
 * @replaces input[type=checkbox]
 */
export interface CheckboxProps {
  /** Label text or nodes (may include a TextLink to the terms). */
  label: React.ReactNode;
  /** Secondary line under the label. */
  description?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  id?: string;
  className?: string;
}

export declare const Checkbox: React.ComponentType<CheckboxProps>;

/**
 * ChipGroup — from @tikvat-libenu/ui@0.1.0.
 */
export interface ChipGroupProps {
  /** Accessible name / visible legend of the group. */
  legend: string;
  /** Hide the legend visually (it stays available to screen readers). */
  hideLegend?: boolean;
  options: ChipOption[];
  /** Selected value(s). */
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** Allow several chips to be selected. */
  multiple?: boolean;
  size?: "md" | "lg";
  className?: string;
}

export declare const ChipGroup: React.ComponentType<ChipGroupProps>;

/**
 * ContactForm — from @tikvat-libenu/ui@0.1.0.
 */
export interface ContactFormProps {
  /** Topics for the "נושא הפנייה" dropdown. Omit to hide the dropdown. */
  topics?: string[];
  /** Called with the values when the visitor submits a valid form. */
  onSubmit?: (values: ContactFormValues) => void;
  /** `idle` normal · `submitting` disables and shows a spinner · `success` / `error` show a message above the form. */
  status?: "success" | "idle" | "submitting" | "error";
  successMessage?: string;
  errorMessage?: string;
  submitLabel?: string;
  /** Text of the consent checkbox. */
  consentLabel?: React.ReactNode;
  /** `card` white rounded card with shadow · `plain` no chrome. */
  variant?: "plain" | "card";
  className?: string;
}

export declare const ContactForm: React.ComponentType<ContactFormProps>;

/**
 * RadioGroup — from @tikvat-libenu/ui@0.1.0.
 */
export interface RadioGroupProps {
  /** Question the group answers — rendered as the fieldset legend. */
  legend: string;
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** `default` plain radios · `card` each option is a bordered tile (better for 2–4 important choices). */
  variant?: "card" | "default";
  orientation?: "vertical" | "horizontal";
  required?: boolean;
  hint?: string;
  className?: string;
}

export declare const RadioGroup: React.ComponentType<RadioGroupProps>;

/**
 * SelectField — from @tikvat-libenu/ui@0.1.0.
 */
export interface SelectFieldProps {
  label: string;
  options: SelectOption[];
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
  /** First, non-selectable row — "בחרו נושא". */
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: "md" | "lg";
  id?: string;
  className?: string;
}

export declare const SelectField: React.ComponentType<SelectFieldProps>;

/**
 * TextField — from @tikvat-libenu/ui@0.1.0.
 * @replaces input
 */
export interface TextFieldProps {
  /** Visible label — always required; placeholders are not labels. */
  label: string;
  name?: string;
  type?: "number" | "search" | "text" | "email" | "tel" | "url" | "password";
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** Helper line under the field. */
  hint?: string;
  /** Error message — also switches the field to its error style and announces it. */
  error?: string;
  required?: boolean;
  /** Show "(לא חובה)" next to the label. */
  optional?: boolean;
  disabled?: boolean;
  /** Icon inside the field, at the start. */
  icon?: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  size?: "md" | "lg";
  /** Force the text direction of the value — `ltr` for e-mail, phone and URLs inside an RTL form. Those types default to `ltr */
  inputDir?: "auto" | "rtl" | "ltr";
  autoComplete?: string;
  id?: string;
  className?: string;
}

export declare const TextField: React.ComponentType<TextFieldProps>;

/**
 * TextareaField — from @tikvat-libenu/ui@0.1.0.
 */
export interface TextareaFieldProps {
  label: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  disabled?: boolean;
  maxLength?: number;
  id?: string;
  className?: string;
}

export declare const TextareaField: React.ComponentType<TextareaFieldProps>;

/**
 * Container — from @tikvat-libenu/ui@0.1.0.
 */
export interface ContainerProps {
  /** Max width: `narrow` 760px (articles, forms) · `default` 1200px · `wide` 1360px (hero, gallery) · `full` no limit. */
  size?: "narrow" | "default" | "wide" | "full";
  /** Remove the side gutters (when nesting inside another Container). */
  flush?: boolean;
  /** HTML tag to render. */
  as?: "div" | "article" | "section" | "main" | "header" | "footer" | "nav";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const Container: React.ComponentType<ContainerProps>;

/**
 * Divider — from @tikvat-libenu/ui@0.1.0.
 */
export interface DividerProps {
  /** `line` is a hairline rule; `petals` is a short row of four logo-coloured dots for a softer section break. */
  variant?: "line" | "petals";
  /** Space above and below, as a spacing-token step. */
  spacing?: 0 | 3 | 4 | 2 | 1 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;
  className?: string;
}

export declare const Divider: React.ComponentType<DividerProps>;

/**
 * Grid — from @tikvat-libenu/ui@0.1.0.
 */
export interface GridProps {
  /** Maximum number of columns on wide screens. Columns drop automatically as the container narrows. */
  columns?: 3 | 4 | 2 | 1 | 5 | 6;
  /** Narrowest an item may get (px) before the grid drops a column. Defaults to a sensible value per column count. */
  minItemWidth?: number;
  /** Gap between items, as a spacing-token step. */
  gap?: 0 | 3 | 4 | 2 | 1 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;
  /** Vertical alignment of items in a row. */
  align?: "start" | "end" | "center" | "stretch";
  /** HTML tag to render. */
  as?: "div" | "ul" | "ol";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const Grid: React.ComponentType<GridProps>;

/**
 * Section — from @tikvat-libenu/ui@0.1.0.
 */
export interface SectionProps {
  /** Background tone. `white`/`soft` for most content; `sky`, `blush`, `sun`, `mint` are the pale logo tints; `navy` is the d */
  tone?: "sun" | "navy" | "soft" | "white" | "sky" | "blush" | "mint";
  /** Vertical padding. */
  spacing?: "none" | "default" | "compact";
  /** Width of the inner Container, or `false` to place children edge-to-edge. */
  container?: false | "narrow" | "default" | "wide" | "full";
  /** Add soft petal shapes in the corners (decorative, hidden from assistive tech). */
  decor?: boolean;
  /** Anchor id for in-page links. */
  id?: string;
  /** Accessible name when the section has no visible heading. */
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const Section: React.ComponentType<SectionProps>;

/**
 * Stack — from @tikvat-libenu/ui@0.1.0.
 */
export interface StackProps {
  /** Flow direction. `row` follows the reading direction (right-to-left in Hebrew). */
  direction?: "column" | "row";
  /** Gap between children, as a spacing-token step (`4` → `var(--tl-space-4)` = 16px). */
  gap?: 0 | 3 | 4 | 2 | 1 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;
  /** Cross-axis alignment. */
  align?: "start" | "end" | "center" | "stretch" | "baseline";
  /** Main-axis distribution. */
  justify?: "start" | "end" | "center" | "between";
  /** Allow children to wrap onto new lines (rows only). */
  wrap?: boolean;
  /** HTML tag to render. */
  as?: "div" | "header" | "footer" | "nav" | "span" | "ul" | "ol";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const Stack: React.ComponentType<StackProps>;

/**
 * TikvatRoot — from @tikvat-libenu/ui@0.1.0.
 */
export interface TikvatRootProps {
  /** Text direction. The site is Hebrew-first, so the default is right-to-left. */
  dir?: "rtl" | "ltr";
  /** BCP-47 language tag written to the wrapper. */
  lang?: string;
  /** Paint the white page background. Turn off when embedding inside an already-styled surface. */
  background?: boolean;
  /** Stretch to at least the full viewport height — use for whole pages. */
  fullHeight?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const TikvatRoot: React.ComponentType<TikvatRootProps>;

/**
 * Icon — from @tikvat-libenu/ui@0.1.0.
 */
export interface IconProps {
  /** Icon to draw. Directional icons (`arrow-forward`, `chevron-back`, …) mirror automatically in RTL. */
  name: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  /** Named size (`xs` 14 · `sm` 16 · `md` 20 · `lg` 24 · `xl` 32 · `2xl` 40) or a px number. */
  size?: number | "sm" | "md" | "lg" | "xl" | "xs" | "2xl";
  /** Stroke thickness on the 24px grid. */
  strokeWidth?: number;
  /** Accessible name. Omit for decorative icons — they are then hidden from assistive tech. */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export declare const Icon: React.ComponentType<IconProps>;

/**
 * Avatar — from @tikvat-libenu/ui@0.1.0.
 */
export interface AvatarProps {
  /** Person's name — used for the alt text and for the initials when there is no photo. */
  name: string;
  src?: string;
  /** `sm` 32 · `md` 44 · `lg` 64 · `xl` 96 px. */
  size?: "sm" | "md" | "lg" | "xl";
  /** Background of the initials fallback. */
  tone?: "pink" | "teal" | "yellow" | "navy" | "orange";
  className?: string;
}

export declare const Avatar: React.ComponentType<AvatarProps>;

/**
 * Gallery — from @tikvat-libenu/ui@0.1.0.
 */
export interface GalleryProps {
  images: GalleryImage[];
  /** Maximum columns on wide screens. */
  columns?: 3 | 4 | 2;
  /** `grid` — equal tiles · `featured` — the first photo is double-size, the rest tile around it. */
  layout?: "grid" | "featured";
  /** Aspect ratio of the tiles. */
  ratio?: "1/1" | "4/3" | "3/2";
  /** Called with the image index when a tile is activated (open your lightbox here). Tiles become buttons when set. */
  onImageClick?: (index: number) => void;
  className?: string;
}

export declare const Gallery: React.ComponentType<GalleryProps>;

/**
 * Picture — from @tikvat-libenu/ui@0.1.0.
 */
export interface PictureProps {
  /** Image URL. When omitted, a branded placeholder (pale tint + butterfly watermark) is shown instead of a broken image. */
  src?: string;
  /** Alternative text. Pass an empty string for purely decorative images. */
  alt: string;
  /** Aspect ratio of the frame. `auto` keeps the image's natural proportions. */
  ratio?: "1/1" | "4/3" | "3/2" | "16/9" | "21/9" | "3/4" | "4/5" | "auto";
  /** Corner treatment: `rounded` 24px (default) · `soft` 16px · `petal` organic logo-petal mask · `circle` · `square`. */
  shape?: "soft" | "rounded" | "petal" | "circle" | "square";
  fit?: "cover" | "contain";
  /** CSS object-position, e.g. `"center top"` to keep faces in frame. */
  position?: string;
  /** Tint of the placeholder shown while there is no `src`. */
  tone?: "sun" | "sky" | "blush" | "mint";
  loading?: "lazy" | "eager";
  /** Optional caption rendered under the image. */
  caption?: string;
  className?: string;
  style?: React.CSSProperties;
}

export declare const Picture: React.ComponentType<PictureProps>;

/**
 * Breadcrumbs — from @tikvat-libenu/ui@0.1.0.
 */
export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export declare const Breadcrumbs: React.ComponentType<BreadcrumbsProps>;

/**
 * Pagination — from @tikvat-libenu/ui@0.1.0.
 */
export interface PaginationProps {
  /** Current page, 1-based. */
  page: number;
  pageCount: number;
  /** Called with the requested page (client-side paging). */
  onPageChange?: (page: number) => void;
  /** Builds a URL per page — renders real links (server-side paging, better for SEO). */
  hrefFor?: (page: number) => string;
  /** How many neighbours to show around the current page. */
  siblings?: number;
  className?: string;
}

export declare const Pagination: React.ComponentType<PaginationProps>;

/**
 * SiteFooter — from @tikvat-libenu/ui@0.1.0.
 */
export interface SiteFooterProps {
  /** Short mission sentence under the logo. */
  description?: string;
  /** Link columns — two or three. */
  columns: SiteFooterColumn[];
  phone?: string;
  email?: string;
  address?: string;
  /** Social profiles shown as round icon links. */
  social?: { platform: "facebook" | "instagram" | "youtube" | "whatsapp"; href: string; }[];
  /** Adds a donate button under the description. */
  donateHref?: string;
  donateLabel?: string;
  /** Registered-association number — "580-123-456". Shown as "עמותה רשומה מס׳ …". */
  registrationNumber?: string;
  /** Small-print links — terms, privacy, accessibility statement. */
  legalLinks?: { label: string; href: string; }[];
  /** Copyright line. */
  copyright?: string;
  className?: string;
}

export declare const SiteFooter: React.ComponentType<SiteFooterProps>;

/**
 * SiteHeader — from @tikvat-libenu/ui@0.1.0.
 */
export interface SiteHeaderProps {
  /** Main navigation — keep it to 4–6 items. */
  links: SiteHeaderLink[];
  /** Where the logo links to. */
  logoHref?: string;
  /** Target of the pink donate button. Omit to hide the button. */
  donateHref?: string;
  donateLabel?: string;
  /** Optional phone number shown as a quiet link next to the donate button (desktop) and inside the mobile menu. */
  phone?: string;
  /** `solid` white bar · `transparent` sits over a hero photo / navy band with white text. */
  variant?: "solid" | "transparent";
  /** Stick to the top of the viewport while scrolling. */
  sticky?: boolean;
  /** Start with the mobile menu open (the menu button toggles it afterwards). */
  defaultMenuOpen?: boolean;
  className?: string;
}

export declare const SiteHeader: React.ComponentType<SiteHeaderProps>;

/**
 * Tabs — from @tikvat-libenu/ui@0.1.0.
 */
export interface TabsProps {
  items: TabItem[];
  /** Controlled active tab id. */
  value?: string;
  /** Initially active tab id (uncontrolled). Defaults to the first item. */
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** `pills` rounded chips (category filters) · `underline` classic tabs. */
  variant?: "underline" | "pills";
  /** Accessible name of the tab list — "סינון לפי קטגוריה". */
  label?: string;
  className?: string;
}

export declare const Tabs: React.ComponentType<TabsProps>;

/**
 * CTABanner — from @tikvat-libenu/ui@0.1.0.
 */
export interface CTABannerProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryAction: { label: string; href: string; icon?: IconName; };
  secondaryAction?: { label: string; href: string; icon?: IconName; };
  /** `navy` dark brand band (default) · `pink` warm gradient for donation pushes · `sun` / `mint` light tints for volunteerin */
  tone?: "sun" | "pink" | "navy" | "mint";
  /** `inline` — text beside the buttons · `centered` — everything centred. */
  layout?: "inline" | "centered";
  /** Show the butterfly watermark. */
  decor?: boolean;
  headingLevel?: 3 | 2;
  className?: string;
}

export declare const CTABanner: React.ComponentType<CTABannerProps>;

/**
 * Hero — from @tikvat-libenu/ui@0.1.0.
 */
export interface HeroProps {
  /** `split` — text beside a petal-masked photo (home page) · `centered` — text only, centred, butterfly watermark (inner pag */
  variant?: "centered" | "split" | "cover";
  eyebrow?: string;
  /** The page's `h1`. Wrap one or two words in `<Highlight>`. */
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Pink main button — normally the donate action. */
  primaryAction?: HeroAction;
  /** Quieter second button. */
  secondaryAction?: HeroAction;
  imageSrc?: string;
  imageAlt?: string;
  /** Background tone for `split` and `centered`. */
  tone?: "sun" | "navy" | "white" | "sky" | "blush" | "mint";
  /** `split` only. Draws the brand decor around the photo: a large soft wing-shaped field behind it that runs off the section */
  decor?: boolean;
  /** Up to three short proof points under the buttons — { value: "1,250+", label: "משפחות מלוות" }. */
  highlights?: { value: string; label: string; }[];
  /** Extra content under the buttons. */
  children?: React.ReactNode;
  className?: string;
}

export declare const Hero: React.ComponentType<HeroProps>;

/**
 * SectionHeader — from @tikvat-libenu/ui@0.1.0.
 */
export interface SectionHeaderProps {
  /** Small label above the title. */
  eyebrow?: string;
  eyebrowTone?: "pink" | "teal" | "navy" | "orange" | "inverse";
  /** Section title. May contain `<Highlight>`. */
  title: React.ReactNode;
  /** One or two supporting sentences. */
  description?: React.ReactNode;
  align?: "start" | "center";
  /** Heading level of the title. */
  headingLevel?: 3 | 2 | 1;
  /** Element placed opposite the title on wide screens — usually a "לכל המאמרים" TextLink or a Button. */
  action?: React.ReactNode;
  className?: string;
}

export declare const SectionHeader: React.ComponentType<SectionHeaderProps>;

/**
 * Steps — from @tikvat-libenu/ui@0.1.0.
 */
export interface StepsProps {
  items: StepItem[];
  /** `horizontal` — a row that wraps on small screens · `vertical` — a timeline down the page. */
  orientation?: "vertical" | "horizontal";
  /** Number the steps (ignored for steps that have an icon). */
  numbered?: boolean;
  headingLevel?: 3 | 4;
  className?: string;
}

export declare const Steps: React.ComponentType<StepsProps>;

/**
 * Eyebrow — from @tikvat-libenu/ui@0.1.0.
 */
export interface EyebrowProps {
  /** Colour of the label and its petal marker. */
  tone?: "pink" | "teal" | "navy" | "orange" | "inverse";
  /** Optional icon instead of the petal marker. */
  icon?: "info" | "arrow-forward" | "arrow-back" | "chevron-forward" | "chevron-back" | "chevron-down" | "chevron-up" | "menu" | "close" | "search" | "plus" | "minus" | "check" | "external-link" | "download" | "share" | (string & {}) /* +73 more */;
  /** HTML tag to render. */
  as?: "div" | "p" | "span";
  className?: string;
  children?: React.ReactNode;
}

export declare const Eyebrow: React.ComponentType<EyebrowProps>;

/**
 * Heading — from @tikvat-libenu/ui@0.1.0.
 */
export interface HeadingProps {
  /** Semantic level → renders `<h1>`…`<h6>`. Keep one `h1` per page and don't skip levels. */
  level?: 3 | 4 | 2 | 1 | 5 | 6;
  /** Visual size, independent of the semantic level. Defaults to the size matching `level`. */
  size?: "display" | "h1" | "h2" | "h3" | "h4" | "h5";
  /** `default` navy · `primary` pink · `muted` grey · `inverse` white (on navy / photos). */
  tone?: "primary" | "inverse" | "default" | "muted";
  align?: "start" | "end" | "center";
  /** Balance line lengths so titles don't leave a single orphan word. */
  balance?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const Heading: React.ComponentType<HeadingProps>;

/**
 * Highlight — from @tikvat-libenu/ui@0.1.0.
 */
export interface HighlightProps {
  /** `marker` — a soft highlighter stroke behind the words · `underline` — a hand-drawn curve under them · `color` — just rec */
  variant?: "color" | "marker" | "underline";
  /** `sun` yellow · `heart` pink · `calm` teal. */
  tone?: "heart" | "sun" | "calm";
  className?: string;
  children?: React.ReactNode;
}

export declare const Highlight: React.ComponentType<HighlightProps>;

/**
 * Paragraph — from @tikvat-libenu/ui@0.1.0.
 */
export interface ParagraphProps {
  /** `lead` 20px intro · `body` 18px default · `sm` 16px · `xs` 14px captions and meta. */
  size?: "sm" | "xs" | "lead" | "body";
  /** `default` navy · `secondary` grey for supporting copy · `muted` lighter grey for meta · `inverse` white on dark. */
  tone?: "secondary" | "inverse" | "default" | "muted";
  weight?: "regular" | "medium" | "semibold" | "bold";
  align?: "start" | "end" | "center";
  /** Limit the line length to a comfortable reading measure (~64 characters). */
  measure?: boolean;
  /** HTML tag to render. */
  as?: "div" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export declare const Paragraph: React.ComponentType<ParagraphProps>;

/**
 * TextLink — from @tikvat-libenu/ui@0.1.0.
 */
export interface TextLinkProps {
  href: string;
  /** `inline` sits inside running text (underlined) · `standalone` is a bold call-to-read-more, usually with an arrow. */
  variant?: "inline" | "standalone";
  /** `primary` pink · `navy` · `inherit` takes the surrounding text colour. */
  tone?: "navy" | "primary" | "inherit";
  /** Add a forward arrow (points left in Hebrew). */
  arrow?: boolean;
  /** Open in a new tab and show the external-link icon. */
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  children?: React.ReactNode;
}

export declare const TextLink: React.ComponentType<TextLinkProps>;

/**
 * FloatingContact — from @tikvat-libenu/ui@0.1.0.
 */
export interface FloatingContactProps {
  /** WhatsApp number in international format, digits only — "972501234567". */
  whatsapp?: string;
  /** Pre-filled WhatsApp message. */
  whatsappMessage?: string;
  /** Phone number to dial — "03-5044900". */
  phone?: string;
  /** Which bottom corner: `start` = right in Hebrew, `end` = left. */
  side?: "start" | "end";
  /** Pin to the viewport corner. Turn off to place the buttons in normal flow (e.g. inside a contact card). */
  fixed?: boolean;
  /** Show text labels beside the icons. */
  showLabels?: boolean;
  className?: string;
}

export declare const FloatingContact: React.ComponentType<FloatingContactProps>;
