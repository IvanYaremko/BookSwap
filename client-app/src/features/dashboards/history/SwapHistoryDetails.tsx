import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/Store";
import SwapChat from "./SwapChat";
/**
 * 
 */
export default observer(function SwapHistoryDetails() {
    const {swapStore } = useStore()
    const { selectedSwap: swap, loadSwap, loadingInitial, clearSelectedSwap } = swapStore
    const {swapId} = useParams<{swapId: string}>();

    useEffect(() => {
        if (swapId) loadSwap(swapId);
        return () => clearSelectedSwap();
    }, [swapId, loadSwap, clearSelectedSwap]);

    if (loadingInitial || !swap) return <LoadingComponent />;

    return (
        <>
            <h1>Chat about swap</h1>
            <SwapChat swapId={swapId}/>
        </>
    )
})