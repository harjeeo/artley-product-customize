"use client";

import { MockupState } from "@/types/mockup";

const VIEW_SIZE = 300;

function Silhouette({ id, color }: { id: string; color: string }) {
  const stroke = "#9ca3af";

  switch (id) {
    case "tshirt":
      return (
        <path
          d="M95 40 L120 25 Q150 45 180 25 L205 40 L235 75 L205 100 L190 88 L190 260 Q150 270 110 260 L110 88 L95 100 L65 75 Z"
          fill={color}
          stroke={stroke}
          strokeWidth={2}
        />
      );
    case "hoodie":
      return (
        <g>
          <path
            d="M95 55 L118 30 Q150 50 182 30 L205 55 L235 90 L205 115 L192 102 L192 265 Q150 275 108 265 L108 102 L95 115 L65 90 Z"
            fill={color}
            stroke={stroke}
            strokeWidth={2}
          />
          <path
            d="M118 30 Q150 15 182 30 Q170 55 150 58 Q130 55 118 30 Z"
            fill={color}
            stroke={stroke}
            strokeWidth={2}
          />
          <path d="M130 150 L170 150 L170 190 L130 190 Z" fill="none" stroke={stroke} strokeWidth={1.5} />
        </g>
      );
    case "wallart":
      return (
        <g>
          <rect x={30} y={30} width={240} height={240} fill="#7c6a52" rx={2} />
          <rect x={44} y={44} width={212} height={212} fill={color} rx={1} />
        </g>
      );
    case "mug":
      return (
        <g>
          <rect x={70} y={95} width={140} height={110} rx={8} fill={color} stroke={stroke} strokeWidth={2} />
          <ellipse cx={140} cy={95} rx={70} ry={12} fill={color} stroke={stroke} strokeWidth={2} />
          <path
            d="M210 120 Q250 130 250 155 Q250 180 210 185"
            fill="none"
            stroke={stroke}
            strokeWidth={8}
          />
        </g>
      );
    case "cushion":
      return (
        <g>
          <rect x={45} y={45} width={210} height={210} rx={26} fill={color} stroke={stroke} strokeWidth={2} />
          <rect x={45} y={45} width={210} height={210} rx={26} fill="none" stroke={stroke} strokeWidth={1} strokeDasharray="4 4" transform="scale(0.94) translate(9 9)" />
        </g>
      );
    case "notebook":
      return (
        <g>
          <rect x={60} y={30} width={180} height={240} rx={6} fill={color} stroke={stroke} strokeWidth={2} />
          <rect x={60} y={30} width={14} height={240} fill="#00000014" />
          <rect x={210} y={40} width={10} height={40} rx={4} fill="#00000022" />
        </g>
      );
    case "phonecase":
      return (
        <g>
          <rect x={85} y={20} width={130} height={260} rx={26} fill={color} stroke={stroke} strokeWidth={2} />
          <circle cx={195} cy={45} r={10} fill="#00000022" />
        </g>
      );
    case "pillow":
      return (
        <g>
          <rect x={40} y={40} width={220} height={220} rx={40} fill={color} stroke={stroke} strokeWidth={2} />
          <rect x={55} y={55} width={190} height={190} rx={30} fill="none" stroke={stroke} strokeWidth={1} strokeDasharray="3 5" />
        </g>
      );
    default:
      return <rect x={40} y={40} width={220} height={220} fill={color} />;
  }
}

export default function MockupFrame({
  mockup,
  artworkUrl,
}: {
  mockup: MockupState;
  artworkUrl: string | null;
}) {
  const { printArea, placement } = mockup;
  const cx = printArea.x + printArea.width / 2;
  const cy = printArea.y + printArea.height / 2;
  const dx = (placement.x / 100) * printArea.width;
  const dy = (placement.y / 100) * printArea.height;
  const clipId = `clip-${mockup.id}`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
      className="w-full h-full"
      role="img"
      aria-label={`${mockup.name} mockup`}
    >
      <defs>
        <clipPath id={clipId}>
          <rect
            x={printArea.x}
            y={printArea.y}
            width={printArea.width}
            height={printArea.height}
            rx={printArea.rx ?? 0}
          />
        </clipPath>
      </defs>

      <Silhouette id={mockup.id} color={mockup.color} />

      {artworkUrl && (
        <g clipPath={`url(#${clipId})`}>
          <g
            transform={`translate(${cx} ${cy}) scale(${placement.scale}) translate(${-cx} ${-cy}) translate(${dx} ${dy})`}
          >
            <image
              href={artworkUrl}
              x={printArea.x}
              y={printArea.y}
              width={printArea.width}
              height={printArea.height}
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </g>
      )}

      {!artworkUrl && (
        <rect
          x={printArea.x}
          y={printArea.y}
          width={printArea.width}
          height={printArea.height}
          rx={printArea.rx ?? 0}
          fill="none"
          stroke="#c4c4c4"
          strokeDasharray="4 4"
          strokeWidth={1.5}
        />
      )}
    </svg>
  );
}
