"use client";

import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type CSSProperties,
  type ElementType,
} from "react";

// ─────────────────────────────────────────────────────────────
// CardContainer — perspective wrapper that drives the tilt
// ─────────────────────────────────────────────────────────────
interface CardContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  maxTilt?: number;
}

export function CardContainer({
  children,
  className = "",
  containerClassName = "",
  maxTilt = 14,
}: CardContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform:
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
    transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
    transformStyle: "preserve-3d",
  });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotX = ((y - height / 2) / height) * -maxTilt;
    const rotY = ((x - width / 2) / width) * maxTilt;
    setStyle({
      transform: `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`,
      transition: "transform 0.1s linear",
      transformStyle: "preserve-3d",
    });
  }

  function onMouseLeave() {
    setStyle({
      transform:
        "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
      transformStyle: "preserve-3d",
    });
  }

  return (
    <div
      className={containerClassName}
      style={{ perspective: "1200px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CardItem — individual depth layer inside the card
// ─────────────────────────────────────────────────────────────
interface CardItemProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export function CardItem({
  as: Tag = "div",
  children,
  className = "",
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  style,
  ...rest
}: CardItemProps) {
  const px = (v: number | string) =>
    typeof v === "number" ? `${v}px` : v;

  const transform = [
    `translateX(${px(translateX)})`,
    `translateY(${px(translateY)})`,
    `translateZ(${px(translateZ)})`,
    `rotateX(${px(rotateX)})`,
    `rotateY(${px(rotateY)})`,
    `rotateZ(${px(rotateZ)})`,
  ].join(" ");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AnyTag = Tag as any;

  return (
    <AnyTag
      className={className}
      style={{ transform, transformStyle: "preserve-3d", ...style }}
      {...rest}
    >
      {children}
    </AnyTag>
  );
}
