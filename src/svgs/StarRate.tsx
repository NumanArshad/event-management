import * as React from "react";
import Svg, { Path } from "react-native-svg";
import Color from "ultis/color";

function SvgComponent() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 9.95L2.292 12 3 7.658 0 4.584l4.146-.634L6 0l1.854 3.95L12 4.584 9 7.658 9.708 12 6 9.95z"
        fill={Color.GRAD_COLOR_3}
      />
    </Svg>
  );
}

const StarRate = React.memo(SvgComponent);
export default StarRate;
