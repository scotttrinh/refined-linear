import React from "dom-chef";

interface EffortProps {
  estimate: number;
}

export const Effort = (props: EffortProps) =>
  ((
    <div className="rl__effort__container">
      <svg
        className="rl__effort__icon"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7" cy="7" r="6.5" stroke="#BEC2C8" fill="none" />
        <path
          d="M10 9.2L7.3 6.7v-3a.6.6 0 10-1.2 0V7c0 .2 0 .3.2.4l3 2.7a.6.6 0 00.7 0 .6.6 0 000-.9z"
          fill="#BEC2C8"
        />
      </svg>
      <span className="rl__effort__number">{props.estimate}</span>
    </div>
  ) as unknown) as HTMLDivElement;
