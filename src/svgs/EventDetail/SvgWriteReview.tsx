import * as React from "react";
import Svg, { Path } from "react-native-svg";
import Color from "ultis/color";

function SvgComponent() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.15 11.394V4H2v12.1h4.706v3.327l3.63-3.327h3.403"
        stroke={Color.GRAD_COLOR_3}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M20.647 10.142l.707-.708a1 1 0 00-1.412-.001l.705.709zm-6.99 6.957l-.706-.709a1 1 0 00-.227.346l.932.363zm-1.48 3.798l-.932-.363a1 1 0 001.285 1.299l-.353-.936zm3.832-1.445l.353.935a.998.998 0 00.352-.226l-.705-.71zM23 12.494l.705.71a1 1 0 00.002-1.417l-.707.707zm-8.637 3.898a1 1 0 00-1.414 1.414l1.414-1.414zm.939 3.767a1 1 0 001.414-1.414l-1.414 1.414zm4.64-10.726L12.95 16.39l1.41 1.418 6.992-6.958-1.411-1.417zm-7.218 7.303l-1.479 3.798 1.864.726 1.479-3.798-1.864-.726zm-.194 5.097l3.832-1.445-.706-1.872-3.832 1.446.706 1.87zm4.184-1.672l6.991-6.958-1.41-1.417-6.992 6.957 1.411 1.418zm6.993-8.374l-2.353-2.353-1.414 1.415 2.353 2.352 1.414-1.414zm-10.758 6.02l2.353 2.352 1.414-1.414-2.353-2.353-1.414 1.414zm3.767.938l-2.353-2.353-1.414 1.414 2.353 2.353 1.414-1.414z"
        fill={Color.GRAD_COLOR_3}
      />
    </Svg>
  );
}

const SvgWriteReview = React.memo(SvgComponent);
export default SvgWriteReview;
