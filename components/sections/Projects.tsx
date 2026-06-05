"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Lightbulb, ShieldAlert, Lock, Code2, Globe } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/constants/data";
import { getModalOverlay, getModalContent } from "@/lib/variants";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { useSafeReducedMotion } from "@/lib/hooks";
import PageFoldWrapper from "@/components/layout/PageFoldWrapper";
import SectionHeading from "@/components/layout/SectionHeading";

// SVG Brand Logo components
const ReactIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#61DAFB]`}>
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
  </svg>
);

const ViteIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="url(#vite-gradient)" d="M13.056 23.238a.57.57 0 0 1-1.02-.355v-5.202c0-.63-.512-1.143-1.144-1.143H5.148a.57.57 0 0 1-.464-.903l3.777-5.29c.54-.753 0-1.804-.93-1.804H.57a.574.574 0 0 1-.543-.746.6.6 0 0 1 .08-.157L5.008.78a.57.57 0 0 1 .467-.24h14.589a.57.57 0 0 1 .466.903l-3.778 5.29c-.54.755 0 1.806.93 1.806h5.745c.238 0 .424.138.513.322a.56.56 0 0 1-.063.603z" />
    <defs>
      <linearGradient id="vite-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BD34FE" />
        <stop offset="100%" stopColor="#41B883" />
      </linearGradient>
    </defs>
  </svg>
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#38BDF8]`}>
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
);

const ReactQueryIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#FF4154]`}>
    <path d="M6.9297 13.6875c.164-.0938.375-.0352.4687.1328l.0625.1055c.4805.8515.9805 1.6601 1.5 2.4258.6133.9023 1.3047 1.8164 2.0743 2.7421a.3455.3455 0 0 1-.0391.4844l-.0742.0664c-2.543 2.2227-4.1914 2.664-4.9532 1.332-.746-1.3046-.4765-3.6718.8086-7.1093a.3437.3437 0 0 1 .1524-.1797ZM17.75 16.3008c.1836-.0313.3594.086.3945.2695l.0196.1016c.6289 3.2851.1875 4.9297-1.3243 4.9297-1.4804 0-3.3593-1.4024-5.6484-4.2032a.3271.3271 0 0 1-.0742-.2226c0-.1875.1562-.3399.3437-.3399h.1211a32.9838 32.9838 0 0 0 2.8086-.0976c1.0703-.086 2.1914-.2305 3.3594-.4375zm.871-6.9766a.3528.3528 0 0 1 .4454-.211l.1016.0352c3.2617 1.1094 4.5039 2.332 3.7187 3.6641-.7656 1.3047-2.9922 2.254-6.6836 2.8477-.082.0117-.168-.004-.2383-.047-.168-.0976-.2265-.3085-.125-.4765l.0625-.1054c.504-.8438.957-1.6836 1.3672-2.5235.4766-.9883.9297-2.0508 1.3516-3.1836zM7.797 8.3398c.082-.0117.168.004.2383.047.168.0976.2265.3085.125.4765l-.0625.1054a34.0882 34.0882 0 0 0-1.3672 2.5235c-.4766.9883-.9297 2.0508-1.3516 3.1836a.3528.3528 0 0 1-.4453.211l-.1016-.0352c-3.2617-1.1094-4.5039-2.332-3.7187-3.6641.7656-1.3047 2.9922-2.254 6.6836-2.8477Zm5.2812-3.9843c2.543-2.2227 4.1914-2.664 4.9532-1.332.746 1.3046.4765 3.6718-.8086 7.1093a.3436.3436 0 0 1-.1524.1797c-.164.0938-.375.0352-.4687-.1328l-.0625-.1055c-.4805-.8515-.9805-1.6601-1.5-2.4258-.6133-.9023-1.3047-1.8164-2.0743-2.7421a.3455.3455 0 0 1 .0391-.4844Zm-5.793-2.082c1.4805 0 3.3633 1.4023 5.6485 4.203a.3488.3488 0 0 1 .0781.2188c-.0039.1914-.1562.3438-.3476.3438l-.1172-.004a34.5835 34.5835 0 0 0-2.8086.1016c-1.0742.086-2.1953.2305-3.3633.4375a.343.343 0 0 1-.3945-.2734l-.0196-.0977c-.629-3.2851-.1876-4.9297 1.3242-4.9297Zm2.8711 5.8124h3.6875a.638.638 0 0 1 .5508.3164l1.8477 3.2188a.6437.6437 0 0 1 0 .6289l-1.8477 3.2227a.638.638 0 0 1-.5507.3164h-3.6875c-.2266 0-.4375-.1211-.547-.3164L7.7579 12.25a.6437.6437 0 0 1 0-.629l1.8516-3.2187c.1093-.1953.3203-.3164.5468-.3164Zm3.2305.793a.638.638 0 0 1 .5508.3164l1.3906 2.4258a.6437.6437 0 0 1 0 .6289l-1.3906 2.4297a.638.638 0 0 1-.5508.3164h-2.7734c-.2266 0-.4375-.1211-.5469-.3164L8.672 12.25a.6437.6437 0 0 1 0-.629l1.3945-2.4257c.1094-.1953.3203-.3164.5469-.3164Zm-.4922.8672h-1.789c-.2266 0-.4336.1172-.547.3164l-.8983 1.5586a.6437.6437 0 0 0 0 .6289l.8984 1.5625a.6317.6317 0 0 0 .5469.3164h1.789a.6317.6317 0 0 0 .547-.3164l.8983-1.5625a.6437.6437 0 0 0 0-.629l-.8984-1.5585c-.1133-.1992-.3203-.3164-.5469-.3164Zm-.4765.8281c.2265 0 .4375.1211.5468.3164l.422.7305c.1132.1953.1132.4375 0 .6289l-.422.7344c-.1093.1953-.3203.3164-.5468.3164h-.836a.6317.6317 0 0 1-.5468-.3164l-.422-.7344c-.1132-.1914-.1132-.4336 0-.629l.422-.7304a.6317.6317 0 0 1 .5468-.3164zm-.418.8164a.548.548 0 0 0-.4727.2735c-.0976.168-.0976.375 0 .5468a.5444.5444 0 0 0 .4727.2696.5444.5444 0 0 0 .4727-.2696c.0976-.1718.0976-.3789 0-.5468A.548.548 0 0 0 12 11.3906Zm-4.4219.5469h.9805M18.9805 7.75c.3906-1.8945.4765-3.3438.2226-4.3984-.1484-.629-.4218-1.1368-.8398-1.5078-.4414-.3907-1-.582-1.625-.582-1.0352 0-2.1211.4726-3.2813 1.3671-.4726.3633-.9648.8047-1.4726 1.3164-.043-.0508-.086-.1015-.1367-.1445-1.4454-1.2852-2.6602-2.082-3.6993-2.3906-.6171-.1836-1.1953-.1993-1.7226-.0235-.5586.1875-1.004.5742-1.3164 1.1172-.5156.8945-.6524 2.0742-.461 3.5274.0782.5898.2149 1.2343.4024 1.9335a1.1187 1.1187 0 0 0-.2149.047C3.008 8.621 1.711 9.2694.9258 10.0155c-.4649.4414-.7695.9375-.8828 1.4805-.1133.5781 0 1.1562.3125 1.6992.5156.8945 1.4648 1.5977 2.8164 2.1563.543.2226 1.1562.4257 1.8437.6093a1.0227 1.0227 0 0 0-.0703.2266c-.3906 1.8906-.4765 3.3438-.2226 4.3945.1484.629.4257 1.1407.8398 1.5078.4414.3907 1 .582 1.625.582 1.0352 0 2.121-.4726 3.2813-1.3632.4765-.3711.9726-.8164 1.4882-1.336a1.2 1.2 0 0 0 .1953.2266c1.4454 1.2852 2.6602 2.082 3.6993 2.3906.6172.1836 1.1953.1993 1.7226.0235.5586-.1875 1.004-.5742 1.3164-1.1172.5157-.8945.6524-2.0742.461-3.5273-.082-.6133-.2227-1.2813-.4258-2.0118a1.2248 1.2248 0 0 0 .2383-.0468c1.828-.6094 3.125-1.2578 3.9101-2.004.4649-.4413.7696-.9374.8828-1.4804.1133-.5781 0-1.1563-.3125-1.6992-.5156-.8946-1.4648-1.5977-2.8164-2.1563-.5586-.2304-1.1953-.4414-1.9062-.625a.8647.8647 0 0 0 .0586-.1953z" /></svg>
);

const NodeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#339933]`}>
    <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0 l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
  </svg>
);

const ExpressIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current text-white`}>
    <path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 0 1 1.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 0 0 0 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 0 0 2.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 0 1-2.589 3.957 6.272 6.272 0 0 1-7.306-.933 6.575 6.575 0 0 1-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 0 1 0 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
  </svg>
);

const MongoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#47A248]`}>
    <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
  </svg>
);

const SupabaseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#3ECF8E]`}>
    <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" />
  </svg>
);

const SolidityIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 160" className={`${className} fill-current text-[#8A92B2]`}>
    <path opacity="0.8" d="M50 44.3013L25 1L0 44.3013L25 87.6025L50 44.3013Z" />
    <path opacity="0.45" d="M50 44.3091L75 1.00781L25 1.00781L0 44.3091H50Z" />
    <path opacity="0.6" d="M75 1.00781L25 1.00781L50 44.3091H100L75 1.00781Z" />
    <path opacity="0.8" d="M50 115.699L75 159L100 115.699L75 72.3975L50 115.699Z" />
    <path opacity="0.45" d="M50 115.691L25 158.993H75L100 115.691L50 115.691Z" />
    <path opacity="0.6" d="M25 158.993H75L50 115.691L0 115.691L25 158.993Z" />
  </svg>
);

const HardhatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path fill="#ffd600" d="M9.87 12.15 9 6.46a9.9 9.9 0 0 1 6 0l-.87 5.69c-.07.49-.5.85-1 .85h-2.27a1 1 0 0 1-.99-.85M22 16c0-.79-.47-1.5-1.2-1.83A9.08 9.08 0 0 0 17 8.5l-1.76 4.84c-.14.4-.52.66-.94.66H9.7c-.42 0-.8-.26-.94-.66L7 8.5a9.1 9.1 0 0 0-3.8 5.66C2.47 14.5 2 15.2 2 16l6.45 1.84c.36.1.73.16 1.1.16h4.88c.37 0 .74-.06 1.1-.16z" />
  </svg>
);

const MetaMaskIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 35 33" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke-linecap="round" stroke-linejoin="round" stroke-width=".25">
      <path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726" />
      <g fill="#e27625" stroke="#e27625">
        <path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z" />
        <path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z" />
        <path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z" />
        <path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z" />
        <path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z" />
        <path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z" />
        <path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z" />
      </g>
      <path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2" />
      <path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2" />
      <path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447" />
      <path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447" />
      <path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228" />
      <path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228" />
      <path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228" />
      <path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228" />
      <path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525" />
      <path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525" />
      <path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525" />
      <path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525" />
      <path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f" />
      <path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f" />
      <path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d" />
      <path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616" />
      <path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a" />
      <path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a" />
      <path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f" />
      <path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f" />
      <path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f" />
    </g>
  </svg>
);

const EthersIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current text-purple-400`}>
    <path d="M24 17.443c-12.547 1.64-21.503 3.61-21.636-4.474 0 0 .274-3.133 4.116-3.33 0 0 .13-2.782 3.065-3.097 1.578-.171 3.37 1.454 3.565 3.165 0 0 3.883-.719 4.051 3.067.059 1.32-.238 3.563-3.983 3.465 0 0-2.167-.294-2.461-3.644-.61 6.485 8.767 6.108 8.902.218.06-2.547-1.572-5.167-5.246-4.676-2.014-5.066-7.375-4.775-9.37-.076-2.854 0-5.035 2.196-5.003 5.064.11 9.23 12.954 6.447 24 4.318Z" />
  </svg>
);

const BootstrapIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#7952B3]`}>
    <path d="M11.77 11.24H9.956V8.202h2.152c1.17 0 1.834.522 1.834 1.466 0 1.008-.773 1.572-2.174 1.572zm.324 1.206H9.957v3.348h2.231c1.459 0 2.232-.585 2.232-1.685s-.795-1.663-2.326-1.663zM24 11.39v1.218c-1.128.108-1.817.944-2.226 2.268-.407 1.319-.463 2.937-.42 4.186.045 1.3-.968 2.5-2.337 2.5H4.985c-1.37 0-2.383-1.2-2.337-2.5.043-1.249-.013-2.867-.42-4.186-.41-1.324-1.1-2.16-2.228-2.268V11.39c1.128-.108 1.819-.944 2.227-2.268.408-1.319.464-2.937.42-4.186-.045-1.3.968-2.5 2.338-2.5h14.032c1.37 0 2.382 1.2 2.337 2.5-.043 1.249.013 2.867.42 4.186.409 1.324 1.098 2.16 2.226 2.268zm-7.927 2.817c0-1.354-.953-2.333-2.368-2.488v-.057c1.04-.169 1.856-1.135 1.856-2.213 0-1.537-1.213-2.538-3.062-2.538h-4.16v10.172h4.181c2.218 0 3.553-1.086 3.553-2.876z" />
  </svg>
);

const HtmlIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#E34F26]`}>
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
  </svg>
);

const CssIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#1572B6]`}>
    <path d="M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63" />
  </svg>
);

const RestIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#FF6C37]`}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm-1.5-13.5v6.75l5.25-3.375L10.5 7.5z" />
  </svg>
);

const DockerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#2496ED]`}>
    <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
  </svg>
);

const ClerkIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#6C47FF]`}>
    <path d="m21.47 20.829-2.881-2.881a.572.572 0 0 0-.7-.084 6.854 6.854 0 0 1-7.081 0 .576.576 0 0 0-.7.084l-2.881 2.881a.576.576 0 0 0-.103.69.57.57 0 0 0 .166.186 12 12 0 0 0 14.113 0 .58.58 0 0 0 .239-.423.576.576 0 0 0-.172-.453Zm.002-17.668-2.88 2.88a.569.569 0 0 1-.701.084A6.857 6.857 0 0 0 8.724 8.08a6.862 6.862 0 0 0-1.222 3.692 6.86 6.86 0 0 0 .978 3.764.573.573 0 0 1-.083.699l-2.881 2.88a.567.567 0 0 1-.864-.063A11.993 11.993 0 0 1 6.771 2.7a11.99 11.99 0 0 1 14.637-.405.566.566 0 0 1 .232.418.57.57 0 0 1-.168.448Zm-7.118 12.261a3.427 3.427 0 1 0 0-6.854 3.427 3.427 0 0 0 0 6.854Z" />
  </svg>
);

const MetaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#0081FB]`}>
    <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />
  </svg>
);

const NextIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current text-white`} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.663 21.056L8.857 8.358V21.056H6.126V2.944H8.857L18.663 15.642V2.944H21.394V21.056H18.663Z" />
  </svg>
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#3178C6]`} xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0V0zm22.427 17.513c-.107-.747-.533-1.387-1.427-1.687-.8-.28-1.587-.493-2.347-.72-.72-.213-1.04-.493-1.04-.973 0-.44.373-.72.973-.72.613 0 .973.28 1.133.773.08.24.36.427.64.427h1.493c.213 0 .427-.133.453-.347.16-1.387-.773-2.48-2.613-2.48-1.68 0-2.827.88-2.827 2.293 0 1.253.747 1.947 2.373 2.4 1 .28 1.947.533 1.947 1.147 0 .507-.48.8-1.173.8-.933 0-1.427-.4-1.627-1.12-.08-.24-.32-.427-.613-.427h-1.573c-.24 0-.453.187-.453.427.187 1.627 1.413 2.453 3.253 2.453 2.053 0 3.387-.96 3.387-2.693zM8.813 10.427H3.947c-.24 0-.427.187-.427.427v1.573c0 .24.187.427.427.427h1.84v9.333c0 .24.187.427.427.427h1.813c.24 0 .427-.187.427-.427v-9.333h1.787c.24 0 .427-.187.427-.427v-1.573c0-.24-.187-.427-.427-.427z" />
  </svg>
);

const GitIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#F05032]`} xmlns="http://www.w3.org/2000/svg">
    <path d="M23.384 11.206L12.794.616a1.123 1.123 0 0 0-1.59 0L8.683 3.13l3.208 3.208a3.125 3.125 0 0 1 3.978 0 3.134 3.134 0 0 1 0 4.428 3.125 3.125 0 0 1-4.28.167l-3.1-3.1-2.91 2.91a1.127 1.127 0 0 0 0 1.59l10.59 10.59a1.127 1.127 0 0 0 1.59 0l10.59-10.59a1.124 1.124 0 0 0-.001-1.596zM13.5 10.5a1.5 1.5 0 1 0-1.5 1.5 1.5 1.5 0 0 0 1.5-1.5zm-5.73-3.18a1.5 1.5 0 1 0-1.5 1.5 1.5 1.5 0 0 0 1.5-1.5zm.9 6.27a1.5 1.5 0 1 0-1.5 1.5 1.5 1.5 0 0 0 1.5-1.5z" />
  </svg>
);

const NginxIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#009639]`} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.004 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12.004 12C18.628 12 24 6.627 24 0H12.004zm2.146 17.146h-1.517l-4.148-5.918v5.918H6.852V6.854h1.517l4.148 5.918V6.854h1.633v10.292z" />
  </svg>
);

const JestIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-[#C21325]`} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.88 15.688c-.688 1.455-2.072 2.312-3.88 2.312-2.73 0-4.62-1.92-4.62-4.62s1.89-4.62 4.62-4.62c1.808 0 3.192.857 3.88 2.312h-2.15c-.432-.612-1.04-.972-1.73-.972-1.393 0-2.318.995-2.318 2.28s.925 2.28 2.318 2.28c.69 0 1.298-.36 1.73-.972h2.15z" />
  </svg>
);

// Tech logo resolver helper component
export function TechLogo({ name, className = "w-4 h-4" }: { name: string; className?: string }) {
  const n = name.toLowerCase().trim();

  if (n.includes("react 1") || n.includes("react 18") || n.includes("react 19") || n === "react") {
    return <ReactIcon className={className} />;
  }
  if (n.includes("next")) {
    return <NextIcon className={className} />;
  }
  if (n.includes("typescript")) {
    return <TypeScriptIcon className={className} />;
  }
  if (n.includes("git")) {
    return <GitIcon className={className} />;
  }
  if (n.includes("nginx")) {
    return <NginxIcon className={className} />;
  }
  if (n.includes("jest")) {
    return <JestIcon className={className} />;
  }
  if (n.includes("vite")) {
    return <ViteIcon className={className} />;
  }
  if (n.includes("tailwind")) {
    return <TailwindIcon className={className} />;
  }
  if (n.includes("query") || n.includes("tanstack")) {
    return <ReactQueryIcon className={className} />;
  }
  if (n.includes("node") || n.includes("mode.js")) {
    return <NodeIcon className={className} />;
  }
  if (n.includes("express")) {
    return <ExpressIcon className={className} />;
  }
  if (n.includes("mongo") || n.includes("mongoose")) {
    return <MongoIcon className={className} />;
  }
  if (n.includes("supabase")) {
    return <SupabaseIcon className={className} />;
  }
  if (n.includes("solidity")) {
    return <SolidityIcon className={className} />;
  }
  if (n.includes("hardhat")) {
    return <HardhatIcon className={className} />;
  }
  if (n.includes("metamask")) {
    return <MetaMaskIcon className={className} />;
  }
  if (n.includes("ethers")) {
    return <EthersIcon className={className} />;
  }
  if (n.includes("bootstrap")) {
    return <BootstrapIcon className={className} />;
  }
  if (n.includes("html5") || n === "html") {
    return <HtmlIcon className={className} />;
  }
  if (n.includes("css3") || n === "css") {
    return <CssIcon className={className} />;
  }
  if (n.includes("docker")) {
    return <DockerIcon className={className} />;
  }
  if (n.includes("clerk")) {
    return <ClerkIcon className={className} />;
  }
  if (n.includes("llama") || n.includes("meta")) {
    return <MetaIcon className={className} />;
  }
  if (n.includes("rest")) {
    return <RestIcon className={className} />;
  }

  // Lucide icon fallbacks
  if (n.includes("lock") || n.includes("jwt") || n.includes("bcrypt") || n.includes("auth")) {
    return <Lock className={`${className} text-accent-purple`} />;
  }
  if (n.includes("test") || n.includes("jest")) {
    return <ShieldAlert className={`${className} text-green-400`} strokeWidth={2} />;
  }
  if (n.includes("sonarqube")) {
    return <ShieldAlert className={`${className} text-blue-400`} strokeWidth={2} />;
  }
  if (n.includes("puppeteer")) {
    return <Globe className={`${className} text-cyan-400`} strokeWidth={2} />;
  }

  return <Code2 className={`${className} text-gray-400`} strokeWidth={2} />;
}

// Helper to identify unique tech logos to avoid duplicates in modal
export function getTechLogoKey(name: string): string {
  const n = name.toLowerCase().trim();

  if (n.includes("react 1") || n.includes("react 18") || n.includes("react 19") || n === "react") {
    return "react";
  }
  if (n.includes("next")) {
    return "next";
  }
  if (n.includes("typescript")) {
    return "typescript";
  }
  if (n.includes("git")) {
    return "git";
  }
  if (n.includes("nginx")) {
    return "nginx";
  }
  if (n.includes("jest")) {
    return "jest";
  }
  if (n.includes("vite")) {
    return "vite";
  }
  if (n.includes("tailwind")) {
    return "tailwind";
  }
  if (n.includes("query") || n.includes("tanstack")) {
    return "reactquery";
  }
  if (n.includes("node") || n.includes("mode.js")) {
    return "node";
  }
  if (n.includes("express")) {
    return "express";
  }
  if (n.includes("mongo") || n.includes("mongoose")) {
    return "mongo";
  }
  if (n.includes("supabase")) {
    return "supabase";
  }
  if (n.includes("solidity")) {
    return "solidity";
  }
  if (n.includes("hardhat")) {
    return "hardhat";
  }
  if (n.includes("metamask")) {
    return "metamask";
  }
  if (n.includes("ethers")) {
    return "ethers";
  }
  if (n.includes("bootstrap")) {
    return "bootstrap";
  }
  if (n.includes("html5") || n === "html") {
    return "html";
  }
  if (n.includes("css3") || n === "css") {
    return "css";
  }
  if (n.includes("docker")) {
    return "docker";
  }
  if (n.includes("clerk")) {
    return "clerk";
  }
  if (n.includes("llama") || n.includes("meta")) {
    return "meta";
  }
  if (n.includes("rest")) {
    return "rest";
  }

  // Lucide icon fallbacks
  if (n.includes("lock") || n.includes("jwt") || n.includes("bcrypt") || n.includes("auth")) {
    return "lock";
  }
  if (n.includes("test") || n.includes("jest")) {
    return "shield-alert-green";
  }
  if (n.includes("sonarqube")) {
    return "shield-alert-blue";
  }
  if (n.includes("puppeteer")) {
    return "globe";
  }

  return name;
}


// Custom high-performance 3D mouse tilt component
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function TiltCard({ children, className, onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useSafeReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    // Apply 10 degrees max rotation
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: shouldReduceMotion
          ? "none"
          : `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
        willChange: "transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

// Simulated mockups for the project cards to show concrete technical content
function AIResumeMockup() {
  const matchedKws = ["Java", "Spring Boot", "ReactJS", "MongoDB", "Node.js", "JavaScript"];
  const missingKws = ["Agile methodology", "Cloud computing", "Cybersecurity"];

  return (
    <div className="relative w-full aspect-[4/3] rounded-xl border border-white/10 bg-[#0d0d10] overflow-hidden font-sans text-[9px] text-gray-400 shadow-2xl flex flex-col group-hover:border-accent-purple/30 transition-colors duration-300">

      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 shrink-0">
        <div className="flex items-center gap-2">
          {/* back arrow */}
          <span className="text-gray-500 text-[10px] select-none">←</span>
          <span className="font-mono text-[9px] text-gray-300 tracking-wide">kevin_HRX.pdf</span>
        </div>
        <span className="text-[8px] text-gray-600 font-mono">Analyzed on: June 3, 2025 at 11:34 AM</span>
      </div>

      {/* Body: left resume preview + right analysis panel */}
      <div className="flex-1 flex gap-0 overflow-hidden min-h-0">

        {/* Left: Resume PDF preview (simplified text layout) */}
        <div className="w-[42%] border-r border-white/5 bg-[#0a0a0c] overflow-hidden flex flex-col">
          <div className="text-[7.5px] text-gray-500 px-2 pt-2 pb-1 border-b border-white/5 font-mono shrink-0">Original Resume</div>
          <div className="flex-1 overflow-hidden px-2.5 py-2 leading-[1.5] text-[6.5px] text-gray-400 space-y-1.5">
            {/* Name header */}
            <div className="text-center space-y-0.5">
              <div className="text-[9px] font-bold text-gray-100">kevin</div>
              <div className="text-[6px] text-gray-600">+91 83598867415 · ddd464@gmail.com · Indore, Madhya Pradesh</div>
            </div>
            <div className="border-t border-white/5 pt-1">
              <div className="text-[7px] font-bold text-gray-300 mb-0.5">Summary</div>
              <p className="text-gray-500 leading-relaxed">Aspiring Full-Stack Developer with a strong foundation in IT and experience in developing full-stack applications.</p>
            </div>
            <div>
              <div className="text-[7px] font-bold text-gray-300 mb-0.5">Work Experience</div>
              <div className="text-[6.5px] font-semibold text-gray-400">Indore — Full-stack Intern <span className="text-gray-600 font-normal">April 2016 – June 2016</span></div>
              <ul className="mt-0.5 pl-2 text-gray-600 space-y-0.5 list-disc list-outside text-[6px]">
                <li>Led design of multiple full-stack applications using Java, Spring Boot, React JS, resulting in a 25% increase in app performance.</li>
                <li>Created secure REST APIs and implemented Firebase for real-time data.</li>
              </ul>
            </div>
            <div>
              <div className="text-[7px] font-bold text-gray-300 mb-0.5">Projects</div>
              <div className="text-[6.5px] text-blue-400 font-semibold">AI Resume Builder</div>
              <p className="text-gray-600 text-[6px]">Built a MERN stack resume builder with LLaMA 3.3 70B for real-time, ATS-optimized content generation via SSF.</p>
            </div>
            <div>
              <div className="text-[7px] font-bold text-gray-300 mb-0.5">Technical Skills</div>
              <p className="text-gray-600 text-[6px]">Programming languages: Java, JavaScript, Skills...</p>
            </div>
          </div>
        </div>

        {/* Right: Analysis results */}
        <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-2">

          {/* ATS Score gauge */}
          <div className="flex items-start gap-3">
            {/* Circular gauge */}
            <div className="relative shrink-0 w-14 h-14">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                {/* Arc: 82% of 100 = stroke-dasharray 82 of 100 */}
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="82 18"
                  strokeDashoffset="0"
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9d4edd" />
                    <stop offset="100%" stopColor="#4ade80" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                <span className="text-[11px] font-bold text-white leading-none">82</span>
                <span className="text-[5.5px] text-gray-500">/100</span>
              </div>
            </div>
            <div className="pt-1 space-y-0.5">
              <div className="text-[7.5px] font-semibold text-gray-300">ATS Score</div>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-500/10 border border-green-500/30 rounded text-[6.5px] text-green-400 font-semibold">Excellent</span>
              <p className="text-[6px] text-gray-600 leading-relaxed max-w-[120px]">Your resume is well-optimized for ATS systems.</p>
            </div>
          </div>

          {/* Analysis Verdict */}
          <div className="bg-white/[0.025] border border-white/5 rounded-lg p-2 space-y-1">
            <div className="text-[7.5px] font-semibold text-gray-300">Analysis Verdict</div>
            <p className="text-[6px] text-gray-500 leading-relaxed">This resume demonstrates a strong foundation in IT and experience in developing full-stack applications, with a good balance of technical skills and project experience.</p>
          </div>

          {/* Formatting issues */}
          <div className="bg-yellow-500/[0.04] border border-yellow-500/15 rounded-lg p-1.5 space-y-1">
            <div className="flex items-center gap-1 text-yellow-500/90 text-[7px] font-semibold">
              <span>⚠</span><span>FORMATTING ISSUES</span>
            </div>
            <ul className="pl-2 space-y-0.5 text-[6px] text-yellow-400/70 list-disc list-outside">
              <li>Lack of clear section headers</li>
              <li>No clear separation between sections</li>
            </ul>
          </div>

          {/* Keywords grid */}
          <div className="grid grid-cols-2 gap-1.5">
            <div className="bg-white/[0.025] border border-white/5 rounded-lg p-1.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[7px] text-gray-300 font-semibold">Matched Keywords</span>
                <span className="text-[6px] text-green-400 font-bold">{matchedKws.length}</span>
              </div>
              <div className="flex flex-wrap gap-0.5">
                {matchedKws.map((kw) => (
                  <span key={kw} className="px-1 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-[5.5px] text-green-400">{kw}</span>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.025] border border-white/5 rounded-lg p-1.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[7px] text-gray-300 font-semibold">Missing Keywords</span>
                <span className="text-[6px] text-red-400 font-bold">{missingKws.length}</span>
              </div>
              <div className="flex flex-wrap gap-0.5">
                {missingKws.map((kw) => (
                  <span key={kw} className="px-1 py-0.5 bg-red-500/10 border border-red-500/20 rounded text-[5.5px] text-red-400">{kw}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Section Breakdown */}
          <div className="bg-white/[0.025] border border-white/5 rounded-lg p-1.5">
            <div className="text-[7px] text-gray-300 font-semibold mb-1">Section Breakdown</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-gray-700 flex items-center justify-center text-[6px] text-gray-400">👤</div>
                <span className="text-[6.5px] text-gray-400">Contact Information</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[6px] text-green-400">✓ Good</span>
                <span className="text-[6.5px] font-bold text-white">80/100</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function CredVaultMockup() {
  const [isSecured, setIsSecured] = useState(false);
  const [studentName, setStudentName] = useState("Alice Vance");
  const [courseMajor, setCourseMajor] = useState("Advanced Web Cryptography");

  return (
    <div
      className="relative w-full aspect-[4/3] rounded-xl border border-white/10 bg-[#0a0a0d] overflow-hidden font-sans text-gray-100 shadow-2xl flex flex-col group/cv transition-colors duration-300"
      onMouseEnter={() => setIsSecured(true)}
      onMouseLeave={() => setIsSecured(false)}
    >
      {/* Browser Header Bar */}
      <div className="flex items-center justify-between bg-black/40 border-b border-white/5 px-3 py-1.5 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          <span className="w-2 h-2 rounded-full bg-yellow-400" />
          <span className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 max-w-[150px] mx-auto bg-white/[0.05] rounded px-2 py-0.5 text-[7px] text-gray-400 text-center font-mono truncate">
          {"credvault.io/sandbox"}
        </div>
        <div className="w-8" />
      </div>

      {/* Main content grid */}
      <div className="flex-1 p-3 flex gap-3 items-center justify-between bg-gradient-to-tr from-[#08090f] via-[#0e111a] to-[#161a29] overflow-hidden">
        
        {/* Left column (Content & Sandbox Input) */}
        <div className="flex-1 max-w-[50%] flex flex-col justify-center gap-2">
          <div className="space-y-1 text-left">
            <h4 className="text-[10px] md:text-[11px] font-extrabold text-blue-400 leading-tight tracking-tight">
              {"Safe, Unalterable & Immediately Verifiable Certificates"}
            </h4>
            <p className="text-[6.5px] leading-snug text-gray-400 font-medium">
              {"CredVault utilizes blockchain networks to eradicate certificate forgery, providing academic bodies and career professionals with a decentralized record system."}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-1">
            <span className="px-2 py-0.5 rounded bg-[#2563eb] text-white text-[5.5px] font-bold shadow-sm cursor-default">
              {"Get Started"}
            </span>
            <span className="px-2 py-0.5 rounded border border-blue-500/40 text-blue-400 text-[5.5px] font-bold cursor-default bg-blue-500/10">
              {"View Benefits"}
            </span>
          </div>

          {/* Interactive Sandbox Card */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-lg p-2 flex flex-col gap-1.5 shadow-sm text-left">
            <div>
              <span className="text-[7px] font-bold text-gray-200">{"Interactive Card Sandbox"}</span>
              <p className="text-[5.5px] text-gray-400">{"Fill in the fields below to customize the digital ID on the right."}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-1.5">
              <div className="flex flex-col gap-0.5">
                <span className="text-[5px] text-gray-400 font-semibold">{"Student Name"}</span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="px-1 py-0.5 bg-white/[0.05] border border-white/10 rounded text-[6px] text-white focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[5px] text-gray-400 font-semibold">{"Course / Major"}</span>
                <input
                  type="text"
                  value={courseMajor}
                  onChange={(e) => setCourseMajor(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="px-1 py-0.5 bg-white/[0.05] border border-white/10 rounded text-[6px] text-white focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>

            <button
              className={`w-full py-1 rounded text-[6px] font-bold transition-all duration-300 ${
                isSecured
                  ? "bg-emerald-600 text-white shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsSecured(!isSecured);
              }}
            >
              {isSecured ? "✓ Certificate Secured" : "Secure Certificate"}
            </button>
          </div>
        </div>

        {/* Right column (Digital ID Card) */}
        <div className="w-[45%] flex items-center justify-center">
          <div
            className={`w-full max-w-[140px] aspect-[1/1.3] bg-white/[0.04] backdrop-blur-md rounded-xl p-3 border transition-all duration-500 flex flex-col justify-between shadow-md ${
              isSecured
                ? "border-emerald-500/40 shadow-[0_4px_20px_rgba(16,185,129,0.15)] bg-white/[0.08]"
                : "border-white/10 hover:border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            }`}
          >
            {/* Card Header */}
            <div className="flex items-center gap-1 border-b border-white/5 pb-1.5 text-left">
              <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <span className="text-[8px]">{"🎓"}</span>
              </div>
              <div className="leading-none">
                <div className="text-[6.5px] font-bold text-gray-200 tracking-tight">{"CREDVAULT UNIVERSITY"}</div>
                <span className="text-[4.5px] text-gray-500 uppercase font-bold tracking-wider">{"OFFICIAL DIGITAL ID"}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="flex-1 flex flex-col justify-center py-2 gap-1.5 text-left">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                  <span className="text-[10px]">{"👤"}</span>
                </div>
                <div className="leading-tight">
                  <span className="text-[4px] text-gray-500 uppercase block font-semibold">{"STUDENT NAME"}</span>
                  <span className="text-[6.5px] font-bold text-gray-200">{studentName || "Alice Vance"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 border-t border-white/5 pt-1.5">
                <div>
                  <span className="text-[4px] text-gray-500 uppercase block font-semibold">{"STUDENT ID"}</span>
                  <span className="text-[5.5px] font-mono text-gray-300">{"CV-2026-8941"}</span>
                </div>
                <div>
                  <span className="text-[4px] text-gray-500 uppercase block font-semibold">{"DEPARTMENT / MAJOR"}</span>
                  <span className="text-[5.5px] font-bold text-gray-300 truncate block max-w-[60px]" title={courseMajor}>
                    {courseMajor || "Web Cryptography"}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="border-t border-white/5 pt-1.5 flex flex-col gap-1 text-left">
              <div className="leading-none">
                <span className="text-[3.5px] text-gray-500 block font-semibold">{"CRYPTOGRAPHIC SIGNATURE HASH"}</span>
                <span className="text-[5px] font-mono text-blue-400 truncate block">
                  {isSecured ? "0x7d91e3e54b684bc8ec9c4125f4..." : "0x00000000000000000000000..."}
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex justify-end">
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[5px] font-bold transition-all duration-300 ${
                  isSecured
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}>
                  <span className={`w-1 h-1 rounded-full ${isSecured ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                  {isSecured ? "VERIFIED ON-CHAIN" : "DRAFT (UNSECURED)"}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

function ProjectMockup({ id }: { id: string }) {
  if (id === "project-1") {
    return <AIResumeMockup />;
  }
  if (id === "project-2") {
    return <CredVaultMockup />;
  }
  return null;
}

const techContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const techItemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
    },
  },
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const shouldReduceMotion = useSafeReducedMotion();
  const openTimeRef = useRef<number>(0);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <PageFoldWrapper id="projects" className="py-24 md:py-32 px-6 max-w-6xl mx-auto">
      {/* Reusable Section Heading */}
      <SectionHeading title="Featured Projects" subtitle="// Showcase" />

      {/* Projects Showcase Grid */}
      <div className="mt-16 md:mt-24 space-y-24 md:space-y-36">
        {PORTFOLIO_DATA.projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const displayIndex = String(index + 1).padStart(2, "0");

          return (
            <div
              key={project.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              {/* Left Column (Details) */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isEven ? "order-1" : "order-1 lg:order-2"
                }`}
              >
                {/* Index / Category Metadata */}
                <div className="flex items-center gap-4">
                  <span className="font-mono text-5xl md:text-6xl font-light text-white/10 select-none">
                    {displayIndex} /
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
                      <span className="text-xs font-mono text-accent-purple tracking-widest uppercase">
                        {project.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-display font-extrabold text-white leading-tight hover:text-accent-purple transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Title description and feature bullet points */}
                <ul className="space-y-3.5 pt-2 text-left">
                  <li className="flex items-start gap-3 text-xs md:text-sm text-gray-300 font-sans leading-relaxed">
                    <div className="flex items-center font-mono text-xs shrink-0 select-none pt-0.5">
                      <span className="text-accent-purple font-semibold">{"//"}</span>
                    </div>
                    <span>{project.description}</span>
                  </li>
                  {project.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs md:text-sm text-gray-300 font-sans leading-relaxed">
                      <div className="flex items-center font-mono text-xs shrink-0 select-none pt-0.5">
                        <span className="text-accent-purple font-semibold">{"//"}</span>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <motion.div
                  variants={techContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="flex flex-wrap gap-2.5 pt-2"
                >
                  {project.techStack.slice(0, 7).map((tech) => (
                    <motion.span
                      key={tech}
                      variants={techItemVariants}
                      whileHover={{
                        scale: 1.08,
                        y: -2,
                        borderColor: "rgba(157, 78, 221, 0.45)",
                        boxShadow: "0 4px 12px rgba(157, 78, 221, 0.15)",
                        backgroundColor: "rgba(157, 78, 221, 0.05)",
                        color: "#ffffff"
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 border border-white/5 bg-[#050505] rounded-full text-xs text-gray-400 font-mono transition-all duration-200 cursor-default"
                    >
                      <TechLogo name={tech} className="w-3.5 h-3.5" />
                      <span>{tech}</span>
                    </motion.span>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 font-mono text-xs">
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-white/5 bg-black/60 rounded-full text-accent-purple hover:border-accent-purple/35 transition-all duration-300 cursor-default select-none group/btn h-9"
                  >
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:hidden shrink-0" />
                    <span className="group-hover/btn:hidden whitespace-nowrap">Live Site</span>
                    <span className="hidden group-hover/btn:inline text-accent-teal whitespace-nowrap text-[10px] font-semibold font-sans">Deploying Soon..</span>
                  </div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-white/5 bg-black/60 rounded-full text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 h-9"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openTimeRef.current = Date.now();
                      setSelectedProject(project);
                    }}
                    className="inline-flex items-center justify-center px-5 py-2 border border-accent-purple/40 text-accent-purple bg-accent-purple/5 rounded-full font-semibold hover:bg-accent-purple/15 hover:border-accent-purple transition-all duration-300 h-9"
                  >
                    <span>Case Study</span>
                  </button>
                </div>
              </div>

              {/* Right Column (Interactive Mockup) */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? "order-2" : "order-2 lg:order-1"
                }`}
              >
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                >
                  <TiltCard className="relative p-1 bg-gradient-to-tr from-accent-purple/15 to-white/5 rounded-2xl hover:shadow-[0_0_30px_rgba(157,78,221,0.15)] transition-shadow duration-500">
                    <ProjectMockup id={project.id} />
                  </TiltCard>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Study details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            variants={getModalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => {
              if (Date.now() - openTimeRef.current > 400) {
                setSelectedProject(null);
              }
            }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-0 md:p-4 overflow-hidden"
          >
            {/* Modal Box */}
            <motion.div
              variants={getModalContent(shouldReduceMotion)}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()} // Prevent close on card click
              className="relative w-full h-full md:h-auto md:max-w-3xl rounded-none md:rounded-2xl border-0 md:border border-accent-purple/35 bg-black overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black border border-white/10 text-gray-400 hover:text-white transition-colors z-20"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-5 md:p-8 space-y-6 h-full md:max-h-[85vh] overflow-y-auto pb-12" data-lenis-prevent>
                {/* Header */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-accent-purple font-semibold tracking-wider uppercase drop-shadow-[0_0_8px_var(--accent-neon-glow)]">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-extrabold text-white pr-8">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Tech Pills */}
                <motion.div
                  variants={techContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-wrap gap-2 border-b border-white/10 pb-6"
                >
                  {selectedProject.techStack.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={techItemVariants}
                      whileHover={{
                        scale: 1.05,
                        borderColor: "rgba(157, 78, 221, 0.45)",
                        boxShadow: "0 4px 15px rgba(157, 78, 221, 0.2)",
                        backgroundColor: "rgba(157, 78, 221, 0.05)",
                        color: "#ffffff"
                      }}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0a] border border-white/5 text-xs text-gray-300 font-mono transition-all cursor-default"
                    >
                      <TechLogo name={tech} className="w-4 h-4 shrink-0" />
                      <span>{tech}</span>
                    </motion.span>
                  ))}
                </motion.div>


                {/* Description Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column - Main Details */}
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="text-sm font-mono text-accent-purple uppercase tracking-wider">{"// Description"}</h4>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed font-sans whitespace-pre-line">
                      {selectedProject.fullDescription}
                    </p>
                  </div>

                  {/* Right Column - Challenges / Stats */}
                  <div className="space-y-4 bg-[#0a0a0a] p-5 border border-white/10 rounded-xl hover-glow-purple">
                    <h4 className="text-sm font-mono text-accent-purple uppercase tracking-wider">{"// Project Details"}</h4>
                    <div className="space-y-3 font-mono text-xs text-gray-400">
                      <p className="flex justify-between">
                        <span>STATUS:</span>
                        <span className="text-accent-purple">NOT DEPLOYED</span>
                      </p>
                      <p className="flex justify-between">
                        <span>ROLE:</span>
                        <span className="text-white">FULL-STACK</span>
                      </p>
                      <p className="flex justify-between">
                        <span>LINT:</span>
                        <span className="text-green-400">PASS</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Challenge & Solution Panels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Challenge panel */}
                  <div className="p-5 rounded-xl border border-red-500/20 bg-red-950/5 flex gap-3 items-start">
                    <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-left">
                      <h5 className="text-xs font-mono font-bold text-red-400 uppercase">The Challenge</h5>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-line">{selectedProject.challenge}</p>
                    </div>
                  </div>

                  {/* Solution panel */}
                  <div className="p-5 rounded-xl border border-accent-purple/20 bg-accent-purple/5 flex gap-3 items-start">
                    <Lightbulb className="w-5 h-5 text-accent-purple shrink-0 mt-0.5 drop-shadow-[0_0_4px_var(--accent-neon-glow)]" />
                    <div className="space-y-1 text-left">
                      <h5 className="text-xs font-mono font-bold text-accent-purple uppercase">The Solution</h5>
                      <p className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-line">{selectedProject.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 border-t border-white/10 pt-6 mt-6">
                  <motion.div
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent-purple text-black text-sm font-semibold transition-all duration-300 cursor-default select-none group/modal-btn w-full sm:w-[160px] hover:shadow-[0_0_20px_rgba(157,78,221,0.45)]"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ExternalLink className="w-4 h-4 group-hover/modal-btn:hidden shrink-0" />
                    <span className="group-hover/modal-btn:hidden whitespace-nowrap">Live Demo</span>
                    <span className="hidden group-hover/modal-btn:inline text-black font-bold whitespace-nowrap text-xs">Deploying Soon..</span>
                  </motion.div>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/10 bg-transparent hover:border-white/35 text-white text-sm font-semibold transition-all duration-300 w-full sm:w-auto"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageFoldWrapper>
  );
}
