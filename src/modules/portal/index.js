import CompPortal from "./CompPortal";
import ProjectPortal from "./ProjectPortal";
import CorePortal from "./CorePortal";

const RENDER_MAP = {
  project: ProjectPortal,
  component: CompPortal,
  core: CorePortal
};

const Render = RENDER_MAP[process.env.RUN_TYPE];

export default Render;
