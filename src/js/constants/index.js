import Classes from "./classes";
import DataKey from "./datakey";
import Defaults from "./defaults";
import Html from "./html";
import Map from "./map";

const VERSION = "0.0.1";

export default {
  CLASSES: Classes,
  DATAKEY: DataKey,
  DEFAULTS: Defaults,
  HTML: Html,
  VERSION,
  MAP: Map,
};
// 再提一层,方便使用，不然太长了
export { Map as MAP };
