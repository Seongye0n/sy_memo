import { useMediaQuery } from 'react-responsive';

const PcSize = () => {
    const pc = useMediaQuery({ query: "(min-width: 1024px)" });
    return pc;
};

const TabletSize = () => {
    const tablet = useMediaQuery({ query: "(min-width:768px) and (max-width:1023px)" });
    return tablet;
};

const MobileSize = () => {
    const mobile = useMediaQuery({query: "(max-width:767px)"});
    return mobile;
};


export {PcSize, TabletSize, MobileSize};