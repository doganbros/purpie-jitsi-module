import React, { useEffect } from "react";
import {
    jitsiStoreContext,
    moduleStoreContext,
    store as ModuleStore,
    useJitsiSelector,
} from "../store";
import { Provider } from "react-redux";

interface InitializationProps {
    JitsiStore: any;
}
function Initializations() {
    const conference = useJitsiSelector(
        (state: any) => state["features/base/conference"].conference
    );

    useEffect(() => {
        document.title = "Meeting - Purpie"
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = 'https://purpie.io/favicon.ico';
    }, []);

    useEffect(() => {
        console.log('conference', conference);
    }, [conference])
    return null;
}
export default ({ JitsiStore }: InitializationProps) => (
    <Provider store={ModuleStore} context={moduleStoreContext}>
        <Provider store={JitsiStore} context={jitsiStoreContext}>
            <Initializations />
        </Provider>
    </Provider>
);
