import {
  type CSSProperties,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import styles from "./Scatter.module.scss";
import { type ScatterType } from "./ScatterType";

interface InnerCircleTypes extends PropsWithChildren {
  radius: number;
  style: CSSProperties;
  className?: string;
  angle: number;
  readOnly: boolean;
}

const InnerCircle = ({
  radius,
  style,
  className,
  children,
  angle,
  readOnly,
}: InnerCircleTypes) => {
  return (
    <div
      className={`${!readOnly && angle !== 0 ? styles.pointable : ""} ${styles.inner} ${className || styles.innerStyle}`}
      style={{
        height: `${radius * 2}px`,
        width: `${radius * 2}px`,
        borderRadius: `${radius}px`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export function Scatter(props: ScatterType): ReactNode {
  const fullRadius = props.size / 2;
  const angle = (2 * Math.PI) / props.selections.length;

  const innerRadius =
    (fullRadius * Math.sin(angle / 2)) / (1 + Math.sin(angle / 2));
  const innerCircles = props.selections.map(
    ({ selection, className }, index: number) => {
      const effectiveAngle =
        angle * ((index - props.selected) % props.selections.length);
      const top =
        fullRadius -
        fullRadius * Math.cos(effectiveAngle) -
        innerRadius +
        innerRadius * Math.cos(effectiveAngle);
      const left =
        fullRadius +
        fullRadius * Math.sin(effectiveAngle) -
        innerRadius -
        innerRadius * Math.sin(effectiveAngle);
      return (
        <InnerCircle
          readOnly={props.readOnly}
          className={className}
          angle={effectiveAngle}
          radius={innerRadius}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            transform: `rotate(${effectiveAngle}rad)`,
          }}
        >
          {selection}
        </InnerCircle>
      );
    },
  );
  return (
    <div
      data-testid="Scatter"
      className={styles.scatter}
      style={{
        height: `${props.size}px`,
        width: `${props.size}px`,
        borderRadius: `calc(${props.size}px / 2)`,
        position: "relative",
      }}
    >
      <div className={styles.middle}>{props.children}</div>
      {innerCircles}
    </div>
  );
}
