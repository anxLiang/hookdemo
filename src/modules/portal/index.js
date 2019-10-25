import CompPortal from "./CompPortal";
import ProjectPortal from "./ProjectPortal";

const Render = process.env.RUN_TYPE === "project" ? ProjectPortal : CompPortal;

export default Render;
