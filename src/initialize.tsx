import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { createStore } from "./mobx/createStore";
import { createPersistence } from "./createPersistence";

export async function initialize() {
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);

  const persistence = createPersistence();

  const store = await createStore({
    persistence,
  });

  return {
    store,
  };
}
