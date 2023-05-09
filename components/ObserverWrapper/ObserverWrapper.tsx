import { ReactNode } from "react";
import { InView } from "react-intersection-observer";
import { eventType, listType } from "@/common/interfaces";

interface Props {
  id: number;
  children: ReactNode;
  list: listType;
  onDispatch: (id: number, event: eventType, list: listType) => void;
}

const ObserverWrapper = ({ id, children, list, onDispatch }: Props) => (
  <InView
    onChange={(inView) => {
      if (inView) {
        onDispatch(id, "impression", list);
      }
    }}
  >
    {({ ref }) => <div ref={ref}>{children}</div>}
  </InView>
);

export default ObserverWrapper;
