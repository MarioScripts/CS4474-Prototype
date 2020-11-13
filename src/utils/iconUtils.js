import React from "react";

export const playSvg = (onClick) => {
    return (
        <svg onClick={onClick}>
            <path stroke="null" d="m0.39465,4.86873c0,-2.5711 2.747,-4.65512 6.13681,-4.65512c1.05272,0 1.72001,0.20854 2.89389,0.56278l43.04871,18.99756c2.00187,0.89988 2.92905,2.34589 3.28686,4.01282l0,0.46756c-0.35781,1.66598 -1.28499,3.11246 -3.28686,4.01282l-43.04808,18.99708c-1.17451,0.35472 -1.8418,0.56231 -2.89389,0.56231c-3.38981,0 -6.13681,-2.08402 -6.13681,-4.65512l0,-38.3027l-0.00063,0z"/>
        </svg>
    );
};

export const pauseSvg = (onClick) => {
    return (
        <svg onClick={onClick}>
            <g transform="matrix(0.4734074263229872,0,0,0.7671139270279911,3.279141858104719,-17.710773796502068) " id="svg_4">
                <path id="svg_5" d="m-1.71985,93.33663l17,0c2.8,0 5,-2.2 5,-5l0,-60c0,-2.8 -2.2,-5 -5,-5l-17,0c-2.8,0 -5,2.2 -5,5l0,60c0,2.7 2.3,5 5,5z"/>
                <path id="svg_6" d="m38.28015,93.33663l17,0c2.8,0 5,-2.2 5,-5l0,-60c0,-2.8 -2.2,-5 -5,-5l-17,0c-2.8,0 -5,2.2 -5,5l0,60c0,2.7 2.3,5 5,5z"/>
            </g>
        </svg>
    );
};

export const volumeMuteSvg = (onClick) => {
    return (
        <svg onClick={onClick}>
            <g stroke="null" id="svg_20">
                <g stroke="null" transform="matrix(0.06625629461858899,0,0,0.06248945231246802,-14.635781754083148,-14.340849056067615) " id="svg_14">
                    <path stroke="null" id="svg_15" d="m428.63388,286.57599l-2.2,-2.2c-2.8,-2.8 -7.35,-2.8 -10.15,0l-20.55,20.55l-20.55,-20.55c-2.8,-2.8 -7.35,-2.8 -10.15,0l-2.2,2.2c-2.8,2.8 -2.8,7.35 0,10.15l20.55,20.55l-20.55,20.55c-2.8,2.8 -2.8,7.35 0,10.15l2.2,2.2c2.8,2.8 7.35,2.8 10.15,0l20.55,-20.55l20.55,20.55c1.4,1.4 3.24,2.1 5.07,2.1c1.84,0 3.68,-0.7 5.08,-2.1l2.2,-2.2c2.8,-2.8 2.8,-7.35 0,-10.15l-20.55,-20.55l20.55,-20.55c2.8,-2.8 2.8,-7.35 0,-10.15z"/>
                </g>
                <g stroke="null" transform="matrix(0.06625629461858899,0,0,0.06248945231246802,-14.635781754083148,-14.340849056067615) " id="svg_16">
                    <path stroke="null" id="svg_17" d="m222.44388,287.29599c0,-6.09 4.95,-11.04 11.04,-11.04l42.3,0l0.57,-1.03c12.83,-23.06 35.02,-38.85 60.88,-43.33c3.19,-0.56 6.45,0.33 8.94,2.43c2.51,2.11 3.94,5.2 3.94,8.47l0,148.97c0,3.27 -1.44,6.36 -3.94,8.47c-2.49,2.1 -5.75,2.98 -8.94,2.43c-25.87,-4.48 -48.06,-20.27 -60.88,-43.33l-0.57,-1.03l-42.3,0c-6.09,0 -11.04,-4.95 -11.04,-11.04l0,-59.97z"/>
                </g>
            </g>
        </svg>
    );
};

export const volumeSvg = (onClick) => {
    return (
        <svg onClick={onClick}>
            <g transform="matrix(0.22185295178560815,0,0,0.20830444905909035,-18.305475825090724,-13.895792969272676) " id="svg_4">
                <path d="m127.6937,102.67554c0.39063,0.39307 0.90381,0.58936 1.41748,0.58936c0.51026,0 1.02051,-0.19385 1.41065,-0.58252c2.58545,-2.57276 4.00927,-6.00244 4.00927,-9.65772c0,-3.64892 -1.41894,-7.07763 -3.9956,-9.65381c-0.78027,-0.78125 -2.04785,-0.78125 -2.82813,0c-0.78125,0.78077 -0.78125,2.04737 0,2.82813c1.8208,1.82129 2.82373,4.24512 2.82373,6.82568c0,2.58301 -1.00537,5.00586 -2.83056,6.82276c-0.7832,0.77881 -0.78613,2.04541 -0.00684,2.82812z"/>
                <path d="m137.66734,76.23218c-0.78028,-0.78222 -2.04639,-0.78271 -2.82862,-0.00342c-0.78174,0.78028 -0.7832,2.04639 -0.00342,2.82862c3.73145,3.74023 5.78614,8.70068 5.78614,13.96728c0,5.26709 -2.05469,10.22754 -5.78614,13.96778c-0.77978,0.78222 -0.77832,2.04834 0.00342,2.82861c0.39063,0.38916 0.90137,0.58398 1.4126,0.58398c0.51269,0 1.02539,-0.1958 1.41602,-0.5874c4.48437,-4.4956 6.9541,-10.45947 6.9541,-16.79297c0,-6.333 -2.46973,-12.29687 -6.9541,-16.79248z"/>
                <path d="m85.81626,104.68482l13.55664,0l0,-0.85895l12.02124,13.84552c0.51215,0.58991 1.25501,0.92871 2.03626,0.92871l5.6134,0c1.48932,0 2.69666,-1.20733 2.69666,-2.69671l0,-45.76142c0,-1.48932 -1.20734,-2.69665 -2.69666,-2.69665l-5.61292,0c-0.78149,0 -1.52459,0.33905 -2.0368,0.92932l-12.02118,13.85412l0,-0.86383l-13.55664,0c-1.48932,0 -2.69665,1.20734 -2.69665,2.69666l0,17.92651c0,1.48938 1.20733,2.69672 2.69665,2.69672z"/>
            </g>
        </svg>
    );
};

export const skipButton = (onClick) => {
    return(
        <svg onClick={onClick}>
            <g transform="rotate(-180 8.427995681762695,8.480660438537598) " stroke="null" id="svg_9">
                <g stroke="null" transform="matrix(0.73184045591164,0,0,0.615580480825547,8.722551002493788,10.93465021004064) " id="svg_4">
                    <path stroke="null" id="svg_5" d="m-10.02249,9.76414a1.88,1.88 0 0 0 1.33,-0.55l11.87,-11.87a1.86,1.86 0 0 0 0,-2.66l-11.87,-11.87a1.88,1.88 0 0 0 -3.21,1.33l0,23.74a1.88,1.88 0 0 0 1.16,1.74a1.84,1.84 0 0 0 0.72,0.14z"/>
                    <path stroke="null" id="svg_6" d="m11.09751,6.01414l0,-20a3,3 0 0 0 -6,0l0,20a3,3 0 0 0 6,0z"/>
                </g>
            </g>
        </svg>
    );
};

export const prevButton = (onClick) => {
    return(
        <svg onClick={onClick}>
            <g stroke="null" transform="matrix(0.73184045591164,0,0,0.615580480825547,8.722551002493788,10.93465021004064) " id="svg_4">
                <path stroke="null" id="svg_5" d="m-10.02249,9.76414a1.88,1.88 0 0 0 1.33,-0.55l11.87,-11.87a1.86,1.86 0 0 0 0,-2.66l-11.87,-11.87a1.88,1.88 0 0 0 -3.21,1.33l0,23.74a1.88,1.88 0 0 0 1.16,1.74a1.84,1.84 0 0 0 0.72,0.14z"/>
                <path stroke="null" id="svg_6" d="m11.09751,6.01414l0,-20a3,3 0 0 0 -6,0l0,20a3,3 0 0 0 6,0z"/>
            </g>
        </svg>
    );
};