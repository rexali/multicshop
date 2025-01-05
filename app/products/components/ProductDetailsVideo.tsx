import Fallback from "../../../components/common/fallback";

export function ProductDetailsVideo({ src }: { src: string }) {

    if (!src) {
        return <Fallback item={'No Video Demo Now'} />
    }

    return <iframe src={src} width={420} height={315} />
}