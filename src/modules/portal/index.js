import CompPortal from "./CompPortal";

const RENDER_MAP = {
  component: CompPortal,
};

const Render = RENDER_MAP[process.env.RUN_TYPE];

export default Render;
