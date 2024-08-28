import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { createStore } from "./mobx/createStore";
import { createPersistence } from "./createPersistence";
import { QueryClient } from "@tanstack/react-query";

export async function initialize() {
  dayjs.extend(utc);
  dayjs.extend(relativeTime);
  dayjs.extend(localizedFormat);

  const persistence = createPersistence();
  const queryClient = new QueryClient();

  const store = await createStore({
    persistence,
    queryClient,
  });

  return {
    store,
    queryClient,
  };
}
