﻿import {Disclosure} from "@headlessui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp, faChevronDown, faTrash} from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import {
    IconArrowsVertical,
    IconArrowsHorizontal,
    IconSpacingVertical,
    IconSpacingHorizontal,
    IconAlignBoxCenterTop,
    IconAlignBoxCenterBottom,
    IconAlignBoxCenterMiddle,
    IconAlignBoxCenterStretch,
    IconAlignBoxLeftMiddle,
    IconAlignBoxRightMiddle,
    IconBorderRadius,
    IconCursorText,
    IconColumns1,
    IconGrid4x4,
    IconTextIncrease,
    IconSquareX,
    IconPhoto,
    IconArrowsUpDown,
    IconTextWrap,
    IconTextWrapDisabled
} from '@tabler/icons-react';
import {ColorInput, ColorPicker, NumberInput, Select} from "@mantine/core";
import {useSelector} from "react-redux";

export const Options = ({options, modifyItemsDashboard, viewport, keepOptions}) => {
    const units = ['auto', 'px', 'rem', 'vw', 'vh', '%'];

    const onChangeInput = ({target}) => {
        let option = optionItem;
        switch (target.id) {
            case 'valueInput':
                option = {
                    ...optionItem,
                    [target.name]: target.value
                }
                setOptionItem(option)
                modifyItemsDashboard(option.idUniqueIdentifier, option)
                break
            default:
                if (keepOptions) {
                    option = {
                        ...optionItem,
                        settingsMobile: {...optionItem.settingsMobile, [target.name]: target.value},
                        settingsTablet: {...optionItem.settingsTablet, [target.name]: target.value},
                        settingsLaptop: {...optionItem.settingsLaptop, [target.name]: target.value},
                        settingsDesktop: {...optionItem.settingsDesktop, [target.name]: target.value},
                        settingsTV: {...optionItem.settingsTV, [target.name]: target.value}
                    }
                    console.log(option)
                    setOptionItem(option)
                    modifyItemsDashboard(option.idUniqueIdentifier, option)
                } else {
                    option = {
                        ...optionItem,
                        ['settings' + viewport.type]: {
                            ...optionItem['settings' + viewport.type],
                            [target.name]: target.value
                        }
                    }
                    setOptionItem(option)
                    modifyItemsDashboard(option.idUniqueIdentifier, option)
                }
                break
        }
    }

    useEffect(() => {
        setOptionItem(options);
        if (options !== undefined) {
            setColorOptions({
                textColor: options['settings' + viewport.type].textColor.split("-")[1].replace("[", "").replace("]", ""),
                borderColor: options['settings' + viewport.type].borderColor.split("-")[1].replace("[", "").replace("]", ""),
                backgroundColor: options['settings' + viewport.type].backgroundColor.split("-")[1].replace("[", "").replace("]", ""),
                decorationColor: options['settings' + viewport.type].decorationColor.split("-")[1].replace("[", "").replace("]", ""),
            })
            if (options.hasOwnProperty("text")) {
                setSpecificAttributes({
                    ...specificAttributes,
                    text: options.text
                })
            }
            if (options.hasOwnProperty("src")) {
                setSpecificAttributes({
                    ...specificAttributes,
                    src: options.src
                })
            }
            if (options.hasOwnProperty("href")) {
                setSpecificAttributes({
                    ...specificAttributes,
                    href: options.href
                })
            }
            if (options.hasOwnProperty("alt")) {
                setSpecificAttributes({
                    ...specificAttributes,
                    alt: options.alt
                })
            }
            if (options.hasOwnProperty("target")) {
                setSpecificAttributes({
                    ...specificAttributes,
                    target: options.target
                })
            }

            setBorderWidth({
                borderRight: {
                    value: options['settings' + viewport.type].borderRight.match(/\d+/g) ? options['settings' + viewport.type].borderRight.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].borderRight.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                borderLeft: {
                    value: options['settings' + viewport.type].borderLeft.match(/\d+/g) ? options['settings' + viewport.type].borderLeft.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].borderLeft.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                borderTop: {
                    value: options['settings' + viewport.type].borderTop.match(/\d+/g) ? options['settings' + viewport.type].borderTop.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].borderTop.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                borderBottom: {
                    value: options['settings' + viewport.type].borderBottom.match(/\d+/g) ? options['settings' + viewport.type].borderBottom.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].borderBottom.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setPaddings({
                paddingRight: {
                    value: options['settings' + viewport.type].paddingRight.match(/\d+/g) ? options['settings' + viewport.type].paddingRight.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].paddingRight.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                paddingLeft: {
                    value: options['settings' + viewport.type].paddingLeft.match(/\d+/g) ? options['settings' + viewport.type].paddingLeft.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].paddingLeft.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                paddingTop: {
                    value: options['settings' + viewport.type].paddingTop.match(/\d+/g) ? options['settings' + viewport.type].paddingTop.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].paddingTop.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                paddingBottom: {
                    value: options['settings' + viewport.type].paddingBottom.match(/\d+/g) ? options['settings' + viewport.type].paddingBottom.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].paddingBottom.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setMargins({
                marginRight: {
                    value: options['settings' + viewport.type].marginRight.match(/\d+/g) ? options['settings' + viewport.type].marginRight.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].marginRight.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                marginLeft: {
                    value: options['settings' + viewport.type].marginLeft.match(/\d+/g) ? options['settings' + viewport.type].marginLeft.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].marginLeft.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                marginTop: {
                    value: options['settings' + viewport.type].marginTop.match(/\d+/g) ? options['settings' + viewport.type].marginTop.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].marginTop.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                marginBottom: {
                    value: options['settings' + viewport.type].marginBottom.match(/\d+/g) ? options['settings' + viewport.type].marginBottom.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].marginBottom.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setSize({
                width: {
                    value: options['settings' + viewport.type].width?.match(/\d+/g) ? options['settings' + viewport.type].width.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].width?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                minWidth: {
                    value: options['settings' + viewport.type].minWidth?.match(/\d+/g) ? options['settings' + viewport.type].minWidth.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].minWidth?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                height: {
                    value: options['settings' + viewport.type].height.match(/\d+/g) ? options['settings' + viewport.type].height.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].height.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                minHeight: {
                    value: options['settings' + viewport.type].minHeight?.match(/\d+/g) ? options['settings' + viewport.type].minHeight.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].minHeight?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
            })
            setRounded({
                value: options['settings' + viewport.type].borderRadius.match(/\d+/g) ? options['settings' + viewport.type].borderRadius.match(/\d+/g).map(Number)[0] : "",
                unit: options['settings' + viewport.type].borderRadius.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
            })
            setFontSize({
                value: options['settings' + viewport.type].textSize.match(/\d+/g) ? options['settings' + viewport.type].textSize.match(/\d+/g).map(Number)[0] : "",
                unit: options['settings' + viewport.type].textSize.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
            })
            setDisplay(options['settings' + viewport.type].display)
            setFlexDirection(options['settings' + viewport.type].flexDirection)
            setFlexWrap(options['settings' + viewport.type].flexWrap)
            setPositions({
                top: {
                    value: options['settings' + viewport.type].top?.match(/\d+/g) ? options['settings' + viewport.type].top.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].top?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                left: {
                    value: options['settings' + viewport.type].left?.match(/\d+/g) ? options['settings' + viewport.type].left.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].left?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                right: {
                    value: options['settings' + viewport.type].right?.match(/\d+/g) ? options['settings' + viewport.type].right.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].right?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                bottom: {
                    value: options['settings' + viewport.type].bottom?.match(/\d+/g) ? options['settings' + viewport.type].bottom.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].bottom?.split("-")[1].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                }
            })
            setGaps({
                gapX: {
                    value: options['settings' + viewport.type].gapX?.match(/\d+/g) ? options['settings' + viewport.type].gapX?.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].gapX?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
                gapY: {
                    value: options['settings' + viewport.type].gapY?.match(/\d+/g) ? options['settings' + viewport.type].gapY?.match(/\d+/g).map(Number)[0] : "",
                    unit: options['settings' + viewport.type].gapY?.split("-")[2].replace("[", "").replace("]", "").replace(/[0-9]/g, "")
                },
            })
            setGridTemplate({
                gridCols: options['settings' + viewport.type].gridCols?.match(/\d+/g) ? options['settings' + viewport.type].gridCols?.match(/\d+/g).map(Number)[0] : "",
                gridRows: options['settings' + viewport.type].gridRows?.match(/\d+/g) ? options['settings' + viewport.type].gridRows?.match(/\d+/g).map(Number)[0] : ""
            })

        }
    }, [options]);

    const [optionItem, setOptionItem] = useState(options);
    const [colorOptions, setColorOptions] = useState(
        {}
    )
    const [specificAttributes, setSpecificAttributes] = useState({
        text: "",
        src: "",
        alt: "",
        href: "",
        target: "",
    })
    const [borderWidth, setBorderWidth] = useState({
        borderRight: "",
        borderLeft: "",
        borderTop: "",
        borderBottom: ""
    })
    const [paddings, setPaddings] = useState({
        paddingRight: "",
        paddingLeft: "",
        paddingTop: "",
        paddingBottom: ""
    })
    const [margins, setMargins] = useState({
        marginRight: "",
        marginLeft: "",
        marginTop: "",
        marginBottom: ""
    })
    const [size, setSize] = useState({
        width: {
            value: "",
            unit: ""
        },
        height: {
            value: "",
            unit: ""
        }
    })
    const [rounded, setRounded] = useState({
        value: "",
        unit: ""
    })
    const [fontSize, setFontSize] = useState({
        value: "",
        unit: ""
    })
    const [positions, setPositions] = useState({
        top: {
            value: "",
            unit: ""
        },
        left: {
            value: "",
            unit: ""
        },
        right: {
            value: "",
            unit: ""
        },
        bottom: {
            value: "",
            unit: ""
        }
    })
    const [colorsUsed, setColorsUsed] = useState([])
    const [display, setDisplay] = useState()
    const [flexDirection, setFlexDirection] = useState()
    const [flexWrap, setFlexWrap] = useState()
    const [gaps, setGaps] = useState({})
    const [gridTemplate, setGridTemplate] = useState({})


    return optionItem !== undefined ? (
            <div className="py-2 pr-2">
                {optionItem.hasOwnProperty("text") ? (
                    <div className="py-2 flex items-center relative h-max">
                        <div className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                            <div className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                <IconCursorText/>
                                <span className="text-xs font-bold">Text</span>
                            </div>
                            <input
                                onChange={({target}) => {
                                    setSpecificAttributes({
                                        ...specificAttributes,
                                        text: target.value
                                    })
                                    onChangeInput({
                                        target: {
                                            id: "valueInput",
                                            name: "text",
                                            value: target.value
                                        }
                                    })
                                }}
                                name="text"
                                value={specificAttributes.text}
                                min={0}
                                type="text"
                                className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                        </div>
                    </div>
                ) : ""}

                {optionItem.hasOwnProperty("src") ? (
                    <>
                        <div className="py-2 flex items-center relative h-max">
                            <div
                                className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                <div
                                    className="w-[30%] flex space-x-1 items-center justify-center border-r-[1px] h-full">
                                    <IconPhoto stroke={2}/>
                                    <span className="text-xs font-bold">SRC</span>
                                </div>
                                <div
                                    className="relative w-[70%] before:content-['Select'] before:top-2/4 before:left-2/4 before:-translate-x-2/4 before:-translate-y-2/4 before:absolute">
                                    <input
                                        onChange={(e) => {
                                            e.preventDefault()
                                            console.log(e.target.files[0])
                                            let reader = new FileReader();
                                            reader.readAsDataURL(e.target?.files[0])
                                            reader.onload = function () {
                                                setSpecificAttributes({
                                                    ...specificAttributes,
                                                    src: reader.result
                                                })
                                                onChangeInput({
                                                    target: {
                                                        id: "valueInput",
                                                        name: "src",
                                                        value: reader.result
                                                    }
                                                })
                                            }
                                            reader.onerror = function (error) {
                                                console.log('Error: ', error);
                                            }
                                        }}
                                        name="image"
                                        id="valueInput"
                                        min={0}
                                        type="file"
                                        accept="image/*"
                                        className="w-full rounded-r-md appearance-none opacity-0 focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                </div>
                            </div>
                        </div>
                        {
                            specificAttributes.src !== "" ? (
                                <div className="py-2 flex items-center relative h-max">
                                    <div
                                        className="relative flex items-center justify-center rounded-md border-[1px] object-contain border-white h-36 w-full">
                                        <img className="object-contain h-full w-full" src={specificAttributes.src}
                                             alt={specificAttributes.alt}/>
                                    </div>
                                </div>
                            ) : ""

                        }
                    </>
                ) : ""}
                {optionItem.hasOwnProperty("alt") ? (
                    <div className="py-2 flex items-center relative h-max">
                        <div
                            className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                            <div
                                className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                <IconCursorText/>
                                <span className="text-xs text-center font-bold">Alt</span>
                            </div>
                            <input
                                onChange={({target}) => {
                                    setSpecificAttributes({
                                        ...specificAttributes,
                                        alt: target.value
                                    })
                                    onChangeInput({
                                        target: {
                                            id: "valueInput",
                                            name: "alt",
                                            value: target.value
                                        }
                                    })
                                }}
                                value={specificAttributes.alt}
                                min={0}
                                type="text"
                                className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                        </div>
                    </div>
                ) : ""}
                {optionItem.hasOwnProperty("settings" + viewport.type) ? (
                    <>
                        <Disclosure as="div" className="border-white pt-2">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                            <span className="font-bold text-white">Text</span>
                                            <div className="relative">
                                                <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp}/>
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown}/>
                                                              )}
                                                            </span>
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </h3>
                                    <Disclosure.Panel className="pl-2 w-full py-1">
                                        <div className="relative flex items-center w-full">
                                            <div className="py-1 border-l-2 w-full pl-1">
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconTextIncrease/>
                                                            <span className="text-[12px] font-bold">Font Size</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setFontSize({
                                                                        ...fontSize,
                                                                        value: target.value
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "textSize",
                                                                            name: "textSize",
                                                                            value: "text-[" + target.value + fontSize.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={fontSize.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setFontSize({
                                                                        ...fontSize,
                                                                        unit: target.value
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "textSize",
                                                                            name: "textSize",
                                                                            value: "text-[" + fontSize.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={fontSize.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="text-white py-2 flex justify-center">
                                                    <h4>Font color</h4>
                                                </div>
                                                <ColorPicker
                                                    fullWidth
                                                    onChange={(value) => {
                                                        setColorOptions({
                                                            ...colorOptions,
                                                            textColor: value
                                                        })
                                                        onChangeInput({
                                                            target: {
                                                                id: "textColor",
                                                                name: "textColor",
                                                                value: "text-[" + value.replaceAll(" ", "") + "]"
                                                            }
                                                        })
                                                    }}
                                                    format="rgba"
                                                    onChangeEnd={(value) => {
                                                        colorsUsed.includes(value) ? null : setColorsUsed([...colorsUsed, value])
                                                    }}
                                                    swatches={colorsUsed}
                                                    defaultValue={colorOptions.textColor}
                                                    classNames={{
                                                        input: "bg-black text-white "
                                                    }}
                                                />
                                                <label className="text-white" htmlFor="FontWeight">Font Weight</label>
                                                <select onChange={onChangeInput}
                                                        value={optionItem['settings' + viewport.type].textWeight}
                                                        id="FontWeight" name="textWeight"
                                                        className="appearance-none rounded-md py-1 border-2 border-gray-500 bg-black text-white px-1 w-full focus:outline-none">
                                                    <option value="font-light">Light</option>
                                                    <option value="font-normal">Normal</option>
                                                    <option value="font-medium">Medium</option>
                                                    <option value="font-semibold">Semibold</option>
                                                    <option value="font-bold">Bold</option>
                                                    <option value="font-extrabold">Extrabold</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        <Disclosure as="div" className="border-white pt-2">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                            <span className="font-bold text-white">Background</span>
                                            <div className="relative">
                                                <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp}/>
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown}/>
                                                              )}
                                                            </span>
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </h3>
                                    <Disclosure.Panel className="pl-2 w-full py-1">
                                        <div className="relative flex items-center w-full">
                                            <div className="py-2 relative border-l-2 w-full pl-1">
                                                <div className="text-white pb-2 flex justify-center">
                                                    <h4>Background color</h4>
                                                </div>
                                                <ColorPicker
                                                    fullWidth
                                                    onChange={(value) => {
                                                        setColorOptions({
                                                            ...colorOptions,
                                                            backgroundColor: value
                                                        })
                                                        onChangeInput({
                                                            target: {
                                                                id: "backgroundColor",
                                                                name: "backgroundColor",
                                                                value: "bg-[" + value.replaceAll(" ", "") + "]"
                                                            }
                                                        })
                                                    }}
                                                    onChangeEnd={(value) => {
                                                        colorsUsed.includes(value) ? null : setColorsUsed([...colorsUsed, value])
                                                    }}
                                                    format="rgba"
                                                    swatches={colorsUsed}
                                                    defaultValue={colorOptions.backgroundColor}
                                                    classNames={{
                                                        input: "bg-black text-white "
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        {/*
                        BORDERS
                        BORDERS
                        BORDERS
                        BORDERS
                        BORDERS
                        BORDERS
                        BORDERS
                        BORDERS
                        */}
                        <Disclosure as="div" className="border-white pt-2">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                            <span className="font-bold text-white">Border</span>
                                            <div className="relative">
                                                <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp}/>
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown}/>
                                                              )}
                                                            </span>
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </h3>
                                    <Disclosure.Panel className="pl-2 w-full py-1">
                                        <div className="relative flex items-center w-full">
                                            <div className="border-l-2 w-full pl-1 pt-2">
                                                {/*



                                                    */}
                                                <div
                                                    className="relative h-24 my-5 mx-auto w-3/5 border-2 border-gray-500 rounded-md">
                                                    <div className="absolute left-2/4 -translate-x-2/4 -translate-y-2/4">
                                                        <div
                                                            className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setBorderWidth({
                                                                        ...borderWidth,
                                                                        borderTop: {
                                                                            value: target.value,
                                                                            unit: borderWidth.borderTop.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borders",
                                                                            name: "borderTop",
                                                                            value: "border-t-[" + target.value + borderWidth.borderTop.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={borderWidth.borderTop.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setBorderWidth({
                                                                            ...borderWidth,
                                                                            borderTop: {
                                                                                value: borderWidth.borderTop.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "borders",
                                                                                name: "borderTop",
                                                                                value: "border-t-[" + borderWidth.borderTop.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={borderWidth.borderTop.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="absolute left-2/4 bottom-0 -translate-x-2/4 translate-y-2/4">
                                                        <div
                                                            className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setBorderWidth({
                                                                        ...borderWidth,
                                                                        borderBottom: {
                                                                            value: target.value,
                                                                            unit: borderWidth.borderBottom.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borders",
                                                                            name: "borderBottom",
                                                                            value: "border-b-[" + target.value + borderWidth.borderBottom.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={borderWidth.borderBottom.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setBorderWidth({
                                                                            ...borderWidth,
                                                                            borderBottom: {
                                                                                value: borderWidth.borderBottom.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "borders",
                                                                                name: "borderBottom",
                                                                                value: "border-b-[" + borderWidth.borderBottom.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={borderWidth.borderBottom.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className="absolute text-sm top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4">
                                                            Borders
                                                        </span>
                                                    <div className="absolute top-2/4 -translate-x-2/4 -translate-y-2/4">
                                                        <div
                                                            className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setBorderWidth({
                                                                        ...borderWidth,
                                                                        borderLeft: {
                                                                            value: target.value,
                                                                            unit: borderWidth.borderLeft.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borders",
                                                                            name: "borderLeft",
                                                                            value: "border-l-[" + target.value + borderWidth.borderLeft.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={borderWidth.borderLeft.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setBorderWidth({
                                                                            ...borderWidth,
                                                                            borderLeft: {
                                                                                value: borderWidth.borderLeft.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "borders",
                                                                                name: "borderLeft",
                                                                                value: "border-l-[" + borderWidth.borderLeft.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={borderWidth.borderLeft.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="absolute top-2/4 right-0 translate-x-2/4 -translate-y-2/4">
                                                        <div
                                                            className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setBorderWidth({
                                                                        ...borderWidth,
                                                                        borderRight: {
                                                                            value: target.value,
                                                                            unit: borderWidth.borderRight.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borders",
                                                                            name: "borderRight",
                                                                            value: "border-r-[" + target.value + borderWidth.borderRight.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={borderWidth.borderRight.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setBorderWidth({
                                                                            ...borderWidth,
                                                                            borderRight: {
                                                                                value: borderWidth.borderRight.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "borders",
                                                                                name: "borderRight",
                                                                                value: "border-r-[" + borderWidth.borderRight.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={borderWidth.borderRight.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconBorderRadius/>
                                                            <span className="text-xs font-bold">Radius</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setRounded({
                                                                        ...rounded,
                                                                        value: target.value
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borderRadius",
                                                                            name: "borderRadius",
                                                                            value: "rounded-[" + target.value + rounded.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={rounded.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setRounded({
                                                                        ...rounded,
                                                                        unit: target.value
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "borderRadius",
                                                                            name: "borderRadius",
                                                                            value: "rounded-[" + rounded.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={rounded.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="text-white py-2 flex justify-center">
                                                    <h4>Border color</h4>
                                                </div>
                                                <ColorPicker
                                                    fullWidth
                                                    onChange={(value) => {
                                                        setColorOptions({
                                                            ...colorOptions,
                                                            borderColor: value
                                                        })
                                                        onChangeInput({
                                                            target: {
                                                                id: "borderColor",
                                                                name: "borderColor",
                                                                value: "border-[" + value.replaceAll(" ", "") + "]"
                                                            }
                                                        })
                                                    }}
                                                    format="rgba"
                                                    onChangeEnd={(value) => {
                                                        colorsUsed.includes(value) ? null : setColorsUsed([...colorsUsed, value])
                                                    }}
                                                    swatches={colorsUsed}
                                                    defaultValue={colorOptions.borderColor}
                                                    classNames={{
                                                        input: "bg-black text-white "
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        {/*
                        SIZES
                        SIZES
                        SIZES
                        SIZES
                        SIZES
                        SIZES
                        SIZES
                        */}
                        <Disclosure as="div" className="border-white pt-2">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                            <span className="font-bold text-white">Size and spacing</span>
                                            <div className="relative">
                                                <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp}/>
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown}/>
                                                              )}
                                                            </span>
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </h3>
                                    <Disclosure.Panel className="pl-2 w-full py-1">
                                        <div className="relative flex items-center w-full">
                                            <div className="border-l-2 w-full pl-1 pt-2">
                                                {/*
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                WIDTH AND HEIGHT
                                                */}
                                                <div className="pb-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconArrowsVertical/>
                                                            <span className="text-xs font-bold">Height</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        height: {
                                                                            value: target.value,
                                                                            unit: size.height.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "height",
                                                                            value: "h-[" + target.value + size.height.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.height.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        height: {
                                                                            value: size.height.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "height",
                                                                            value: "h-[" + size.height.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.height.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconArrowsVertical/>
                                                            <span
                                                                className="text-xs text-center font-bold">Min<br/>Height</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        minHeight: {
                                                                            value: target.value,
                                                                            unit: size.minHeight.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "minHeight",
                                                                            value: "min-h-[" + target.value + size.minHeight.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.minHeight.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        minHeight: {
                                                                            value: size.minHeight.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "minHeight",
                                                                            value: "min-h-[" + size.minHeight.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.minHeight.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconArrowsHorizontal/>
                                                            <span className="text-xs font-bold">Width</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        width: {
                                                                            value: target.value,
                                                                            unit: size.width.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "width",
                                                                            value: "w-[" + target.value + size.width.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.width.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        width: {
                                                                            value: size.width.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "width",
                                                                            value: "w-[" + size.width.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.width.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="py-2 flex items-center relative h-max">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10 w-full">
                                                        <div
                                                            className="w-[30%] flex items-center justify-center border-r-[1px] h-full">
                                                            <IconArrowsVertical/>
                                                            <span
                                                                className="text-xs text-center font-bold">Min<br/>Width</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        minWidth: {
                                                                            value: target.value,
                                                                            unit: size.minWidth.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "minWidth",
                                                                            value: "min-w-[" + target.value + size.minWidth.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.minWidth.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[70%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setSize({
                                                                        ...size,
                                                                        minWidth: {
                                                                            value: size.minWidth.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "size",
                                                                            name: "minWidth",
                                                                            value: "min-w-[" + size.minWidth.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={size.minWidth.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                {/*
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                MARGINS AND PADDINGS
                                                */}
                                                <div className="relative h-24 mt-6 mb-5 mx-auto w-3/5 border-2 border-gray-500 rounded-md">
                                                    <div className="absolute left-2/4 -translate-x-2/4 -translate-y-2/4">
                                                        <div
                                                            className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setMargins({
                                                                        ...margins,
                                                                        marginTop: {
                                                                            value: target.value,
                                                                            unit: margins.marginTop.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "margins",
                                                                            name: "marginTop",
                                                                            value: "mt-[" + target.value + margins.marginTop.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={margins.marginTop.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setMargins({
                                                                            ...margins,
                                                                            marginTop: {
                                                                                value: margins.marginTop.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "margins",
                                                                                name: "marginTop",
                                                                                value: "mt-[" + margins.marginTop.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={margins.marginTop.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="absolute left-2/4 bottom-0 -translate-x-2/4 translate-y-2/4">
                                                        <div
                                                            className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setMargins({
                                                                        ...margins,
                                                                        marginBottom: {
                                                                            value: target.value,
                                                                            unit: margins.marginBottom.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "margins",
                                                                            name: "marginBottom",
                                                                            value: "mb-[" + target.value + margins.marginBottom.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={margins.marginBottom.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setMargins({
                                                                            ...margins,
                                                                            marginBottom: {
                                                                                value: margins.marginBottom.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "margins",
                                                                                name: "marginBottom",
                                                                                value: "mb-[" + margins.marginBottom.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={margins.marginBottom.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <span
                                                        className="absolute text-sm top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4">
                                                            Margins
                                                        </span>
                                                    <div className="absolute top-2/4 -translate-x-2/4 -translate-y-2/4">
                                                        <div
                                                            className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setMargins({
                                                                        ...margins,
                                                                        marginLeft: {
                                                                            value: target.value,
                                                                            unit: margins.marginLeft.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "margins",
                                                                            name: "marginLeft",
                                                                            value: "ml-[" + target.value + margins.marginLeft.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={margins.marginLeft.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setMargins({
                                                                            ...margins,
                                                                            marginLeft: {
                                                                                value: margins.marginLeft.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "margins",
                                                                                name: "marginLeft",
                                                                                value: "ml-[" + margins.marginLeft.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={margins.marginLeft.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="absolute top-2/4 right-0 translate-x-2/4 -translate-y-2/4">
                                                        <div
                                                            className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setMargins({
                                                                        ...margins,
                                                                        marginRight: {
                                                                            value: target.value,
                                                                            unit: margins.marginRight.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "margins",
                                                                            name: "marginRight",
                                                                            value: "mr-[" + target.value + margins.marginRight.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={margins.marginRight.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setMargins({
                                                                            ...margins,
                                                                            marginRight: {
                                                                                value: margins.marginRight.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "margins",
                                                                                name: "marginRight",
                                                                                value: "mr-[" + margins.marginRight.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={margins.marginRight.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="relative h-24 mt-12 mb-5 mx-auto w-3/5 border-2 border-gray-500 rounded-md">
                                                    <div className="absolute left-2/4 -translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input
                                                                onChange={({target}) => {
                                                                    setPaddings({
                                                                        ...paddings,
                                                                        paddingTop: {
                                                                            value: target.value,
                                                                            unit: paddings.paddingTop.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "paddings",
                                                                            name: "paddingTop",
                                                                            value: "pt-[" + target.value + paddings.paddingTop.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={paddings.paddingTop.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setPaddings({
                                                                            ...paddings,
                                                                            paddingTop: {
                                                                                value: paddings.paddingTop.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "paddings",
                                                                                name: "paddingTop",
                                                                                value: "pt-[" + paddings.paddingTop.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={paddings.paddingTop.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="absolute left-2/4 bottom-0 -translate-x-2/4 translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input onChange={({target}) => {
                                                                    setPaddings({
                                                                        ...paddings,
                                                                        paddingBottom: {
                                                                            value: target.value,
                                                                            unit: paddings.paddingBottom.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "paddings",
                                                                            name: "paddingBottom",
                                                                            value: "pb-[" + target.value + paddings.paddingBottom.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={paddings.paddingBottom.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setPaddings({
                                                                            ...paddings,
                                                                            paddingBottom: {
                                                                                value: paddings.paddingBottom.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "paddings",
                                                                                name: "paddingBottom",
                                                                                value: "pb-[" + paddings.paddingBottom.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={paddings.paddingBottom.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <span className="absolute text-sm top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4">
                                                            Paddings
                                                        </span>
                                                    <div className="absolute top-2/4 -translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input onChange={({target}) => {
                                                                    setPaddings({
                                                                        ...paddings,
                                                                        paddingLeft: {
                                                                            value: target.value,
                                                                            unit: paddings.paddingLeft.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "paddings",
                                                                            name: "paddingLeft",
                                                                            value: "pl-[" + target.value + paddings.paddingLeft.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={paddings.paddingLeft.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setPaddings({
                                                                            ...paddings,
                                                                            paddingLeft: {
                                                                                value: paddings.paddingLeft.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "paddings",
                                                                                name: "paddingLeft",
                                                                                value: "pl-[" + paddings.paddingLeft.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={paddings.paddingLeft.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-2/4 right-0 translate-x-2/4 -translate-y-2/4">
                                                        <div className="relative flex rounded-md border-[1px] border-white h-10 w-20">
                                                            <input onChange={({target}) => {
                                                                    setPaddings({
                                                                        ...paddings,
                                                                        paddingRight: {
                                                                            value: target.value,
                                                                            unit: paddings.paddingRight.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "paddings",
                                                                            name: "paddingRight",
                                                                            value: "pr-[" + target.value + paddings.paddingRight.unit + "]"
                                                                        }
                                                                    })
                                                                }}
                                                                value={paddings.paddingRight.value}
                                                                min={0}
                                                                type="number"
                                                                className="w-full rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            <select
                                                                onChange={
                                                                    ({target}) => {
                                                                        setPaddings({
                                                                            ...paddings,
                                                                            paddingRight: {
                                                                                value: paddings.paddingRight.value,
                                                                                unit: target.value
                                                                            }
                                                                        })
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "paddings",
                                                                                name: "paddingRight",
                                                                                value: "pr-[" + paddings.paddingRight.value + target.value + "]"
                                                                            }
                                                                        })
                                                                    }
                                                                }
                                                                value={paddings.paddingRight.unit}
                                                                className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                name="" id="">
                                                                {
                                                                    units.map((unit, index) => {
                                                                        return (<option key={index * Math.random()}
                                                                                        value={unit}>{unit}</option>)
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                        {/*
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        DISPLAY AND POSITION
                        */}
                        <Disclosure as="div" className="border-white pt-2">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md py-1 z-50 flex w-full items-center justify-between text-md text-gray-400 hover:text-white px-2 bg-black border-stone-800"}>
                                            <span className="font-bold text-white">Display and Position</span>
                                            <div className="relative">
                                                <Disclosure.Button className="p-2 ml-1">
                                                            <span className="flex items-center">
                                                              {open ? (
                                                                  <FontAwesomeIcon icon={faChevronUp}/>
                                                              ) : (
                                                                  <FontAwesomeIcon icon={faChevronDown}/>
                                                              )}
                                                            </span>
                                                </Disclosure.Button>
                                            </div>
                                        </div>
                                    </h3>
                                    <Disclosure.Panel className="pl-2 w-full py-1">
                                        <div className="relative flex flex-wrap items-start w-full">
                                            <div className="border-l-2 w-full pl-1 pt-2">
                                                {/*
                                                    DISPLAY
                                                    DISPLAY
                                                    DISPLAY
                                                    DISPLAY
                                                    DISPLAY
                                                    DISPLAY
                                                    DISPLAY
                                                    */}
                                                <h3 className="text-sm text-center font-bold">Display</h3>
                                                <div className="w-full p-3 flex justify-center space-x-3">
                                                    <button
                                                        onClick={() => {
                                                            setDisplay("hidden")
                                                            onChangeInput({
                                                                target: {
                                                                    id: "position",
                                                                    name: "display",
                                                                    value: "hidden"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-2/6 flex items-center px-2 rounded-md border-2 py-1 ${display === 'hidden' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <IconSquareX/>
                                                        <span className="pl-1">Hidden</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setDisplay("flex")
                                                            onChangeInput({
                                                                target: {
                                                                    id: "position",
                                                                    name: "display",
                                                                    value: "flex"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-2/6 flex items-center px-2 rounded-md border-2 py-1 ${display === 'flex' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <IconColumns1/>
                                                        <span className="px-2">Flex</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setDisplay("grid")
                                                            onChangeInput({
                                                                target: {
                                                                    id: "position",
                                                                    name: "display",
                                                                    value: "grid"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-2/6 flex items-center px-2 rounded-md border-2 py-1 ${display === 'grid' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <IconGrid4x4/>
                                                        <span className="px-2">Grid</span>
                                                    </button>
                                                </div>
                                                {
                                                    display === 'flex' ? (
                                                        <>
                                                            <div className="w-full p-3 flex justify-center space-x-3">
                                                                <button
                                                                    onClick={() => {
                                                                        setFlexDirection("flex-col")
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "display",
                                                                                name: "flexDirection",
                                                                                value: "flex-col"
                                                                            }
                                                                        })
                                                                    }}
                                                                    className={`w-3/6 flex items-center px-2 rounded-md border-2 py-1 ${flexDirection === 'flex-col' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                    <IconArrowsUpDown/>
                                                                    <span className="px-2">Flex Col</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setFlexDirection("flex-row")
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "display",
                                                                                name: "flexDirection",
                                                                                value: "flex-row"
                                                                            }
                                                                        })
                                                                    }}
                                                                    className={`w-3/6 flex items-center px-2 rounded-md border-2 py-1 ${flexDirection === 'flex-row' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span className="rotate-90">
                                                                    <IconArrowsUpDown/>
                                                                </span>
                                                                    <span className="px-2">Flex Row</span>
                                                                </button>
                                                            </div>
                                                            <div className="w-full p-3 flex justify-center space-x-3">
                                                                <button
                                                                    onClick={() => {
                                                                        setFlexWrap("flex-wrap")
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "wrap",
                                                                                name: "flexWrap",
                                                                                value: "flex-wrap"
                                                                            }
                                                                        })
                                                                    }}
                                                                    className={`w-3/6 flex items-center px-2 rounded-md border-2 py-1 ${flexWrap === 'flex-wrap' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                    <IconTextWrap/>
                                                                    <span className="px-2">Wrap</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setFlexWrap("flex-nowrap")
                                                                        onChangeInput({
                                                                            target: {
                                                                                id: "wrap",
                                                                                name: "flexWrap",
                                                                                value: "flex-nowrap"
                                                                            }
                                                                        })
                                                                    }}
                                                                    className={`w-3/6 flex items-center px-2 rounded-md border-2 py-1 ${flexWrap === 'flex-nowrap' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                                <span>
                                                                    <IconTextWrapDisabled/>
                                                                </span>
                                                                    <span className="px-2">No wrap</span>
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : ''
                                                }
                                                {
                                                    display === 'grid' ? (
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="relative flex rounded-md border-[1px] border-white h-10">
                                                                <div
                                                                    className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                                    <span className="text-[12px] font-bold">Cols</span>
                                                                </div>
                                                                <input
                                                                    onChange={
                                                                        ({target}) => {
                                                                            setGridTemplate({
                                                                                ...gridTemplate,
                                                                                gridCols: target.value
                                                                            })
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "gridCols",
                                                                                    name: "gridCols",
                                                                                    value: "grid-cols-" + target.value
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                    value={gridTemplate.gridCols}
                                                                    min={0}
                                                                    max={12}
                                                                    type="number"
                                                                    className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            </div>
                                                            <div className="relative flex rounded-md border-[1px] border-white h-10">
                                                                <div
                                                                    className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                                    <span className="text-[12px] font-bold">Rows</span>
                                                                </div>
                                                                <input
                                                                    onChange={
                                                                        ({target}) => {
                                                                            setGridTemplate({
                                                                                ...gridTemplate,
                                                                                gridRows: target.value
                                                                            })
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "gridRows",
                                                                                    name: "gridRows",
                                                                                    value: "grid-rows-" + target.value
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                    value={gridTemplate.gridRows}
                                                                    min={0}
                                                                    max={12}
                                                                    type="number"
                                                                    className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                            </div>
                                                            <div className="relative flex rounded-md border-[1px] border-white h-10">
                                                                <div
                                                                    className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                                    <span className="text-[12px] font-bold">Gap X</span>
                                                                </div>
                                                                <input
                                                                    onChange={
                                                                        ({target}) => {
                                                                            setGaps({
                                                                                ...gaps,
                                                                                gapX: {
                                                                                    value: target.value,
                                                                                    unit: gaps.gapX?.unit
                                                                                }
                                                                            })
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "gaps",
                                                                                    name: "gapX",
                                                                                    value: "gap-x-[" + target.value + gaps.gapX?.unit + "]"
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                    value={gaps.gapX?.value}
                                                                    min={0}
                                                                    type="number"
                                                                    className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                                <select
                                                                    onChange={
                                                                        ({target}) => {
                                                                            setGaps({
                                                                                ...gaps,
                                                                                gapX: {
                                                                                    value: gaps.gapX?.value,
                                                                                    unit: target.value
                                                                                }
                                                                            })
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "gaps",
                                                                                    name: "gapX",
                                                                                    value: "gap-x-[" + gaps.gapX?.value + target.value + "]"
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                    value={gaps.gapX?.unit}
                                                                    className="absolute top-2/4 focus:outline-none -translate-y-2/4 right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                    name="" id="">
                                                                    {
                                                                        units.map((unit, index) => {
                                                                            return (<option key={index * Math.random()}
                                                                                            value={unit}>{unit}</option>)
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="relative flex rounded-md border-[1px] border-white h-10">
                                                                <div
                                                                    className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                                    <span className="text-[12px] font-bold">Gap Y</span>
                                                                </div>
                                                                <input
                                                                    onChange={
                                                                        ({target}) => {
                                                                            setGaps({
                                                                                ...gaps,
                                                                                gapY: {
                                                                                    value: target.value,
                                                                                    unit: gaps.gapY?.unit
                                                                                }
                                                                            })
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "gaps",
                                                                                    name: "gapY",
                                                                                    value: "gap-y-[" + target.value + gaps.gapY?.unit + "]"
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                    value={gaps.gapY?.value}
                                                                    min={0}
                                                                    type="number"
                                                                    className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                                <select
                                                                    onChange={
                                                                        ({target}) => {
                                                                            setGaps({
                                                                                ...gaps,
                                                                                gapY: {
                                                                                    value: gaps.gapY?.value,
                                                                                    unit: target.value
                                                                                }
                                                                            })
                                                                            onChangeInput({
                                                                                target: {
                                                                                    id: "gaps",
                                                                                    name: "gapY",
                                                                                    value: "gap-y-[" + gaps.gapY?.value + target.value + "]"
                                                                                }
                                                                            })
                                                                        }
                                                                    }
                                                                    value={gaps.gapY?.unit}
                                                                    className="absolute top-2/4 focus:outline-none -translate-y-2/4 right-0 w-10 text-center h-8 bg-black appearance-none"
                                                                    name="" id="">
                                                                    {
                                                                        units.map((unit, index) => {
                                                                            return (<option key={index * Math.random()}
                                                                                            value={unit}>{unit}</option>)
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    ) : ''
                                                }
                                                {/*
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    ALIGN AND JUSTIFY
                                                    */}
                                                <div className="relative my-2 flex h-10 w-full">
                                                    <div
                                                        className="w-[35%] flex items-center text-xs justify-start px-2 border-r-[1px] h-full">
                                                        <IconSpacingVertical/>
                                                        <span className="font-bold">Align</span>
                                                    </div>
                                                    <div className="flex items-center justify-around w-[65%]">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "itemsAlign",
                                                                        value: "items-start"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewport.type].itemsAlign === 'items-start' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Top">
                                                            <IconAlignBoxCenterTop/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "itemsAlign",
                                                                        value: "items-center"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewport.type].itemsAlign === 'items-center' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Center">
                                                            <IconAlignBoxCenterMiddle/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "itemsAlign",
                                                                        value: "items-end"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewport.type].itemsAlign === 'items-end' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Bottom">
                                                            <IconAlignBoxCenterBottom/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "itemsAlign",
                                                                        value: "items-stretch"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewport.type].itemsAlign === 'items-stretch' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Stretch">
                                                            <IconAlignBoxCenterStretch/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "itemsAlign",
                                                                        value: "items-baseline"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewport.type].itemsAlign === 'items-baseline' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Baseline">
                                                            <IconAlignBoxCenterStretch/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="relative my-2 flex h-10 w-full">
                                                    <div
                                                        className="w-[35%] flex items-center text-xs text-center justify-start px-2 border-r-[1px] h-full">
                                                        <IconSpacingHorizontal/>
                                                        <span className="font-bold">Justify</span>
                                                    </div>
                                                    <div className="flex items-center justify-around w-[65%]">
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "justifyContent",
                                                                        value: "justify-start"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewport.type].justifyContent === 'justify-start' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Left">
                                                            <IconAlignBoxLeftMiddle/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "justifyContent",
                                                                        value: "justify-center"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewport.type].justifyContent === 'justify-center' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Center">
                                                            <IconAlignBoxCenterMiddle/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "justifyContent",
                                                                        value: "justify-end"
                                                                    }
                                                                })
                                                            }}
                                                            className={`text-center ${(optionItem['settings' + viewport.type].justifyContent === 'justify-end' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Right">
                                                            <IconAlignBoxRightMiddle/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "justifyContent",
                                                                        value: "justify-around"
                                                                    }
                                                                })
                                                            }}
                                                            className={`rotate-90 text-center ${(optionItem['settings' + viewport.type].justifyContent === 'justify-around' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Around">
                                                            <IconAlignBoxCenterStretch/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "justifyContent",
                                                                        value: "justify-between"
                                                                    }
                                                                })
                                                            }}
                                                            className={`rotate-90 text-center ${(optionItem['settings' + viewport.type].justifyContent === 'justify-between' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Between">
                                                            <IconAlignBoxCenterStretch/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onChangeInput({
                                                                    target: {
                                                                        id: "position",
                                                                        name: "justifyContent",
                                                                        value: "justify-evenly"
                                                                    }
                                                                })
                                                            }}
                                                            className={`rotate-90 text-center ${(optionItem['settings' + viewport.type].justifyContent === 'justify-evenly' ? 'text-cyan-400' : 'text-white')}`}
                                                            title="Evenly">
                                                            <IconAlignBoxCenterStretch/>
                                                        </button>
                                                    </div>
                                                </div>
                                                {/*
                                                    POSITION
                                                    POSITION
                                                    POSITION
                                                    POSITION
                                                    POSITION
                                                    POSITION
                                                    POSITION
                                                    */}
                                                <h3 className="text-sm text-center font-bold">Position</h3>
                                                <div className="w-full p-3 flex justify-center space-x-3">
                                                    <button
                                                        onClick={() => {
                                                            onChangeInput({
                                                                target: {
                                                                    id: "position",
                                                                    name: "position",
                                                                    value: "relative"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-2/4 flex items-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewport.type].position === 'relative' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <span className="px-2">Relative</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            onChangeInput({
                                                                target: {
                                                                    id: "position",
                                                                    name: "position",
                                                                    value: "absolute"
                                                                }
                                                            })
                                                        }}
                                                        className={`w-2/4 flex items-center px-2 rounded-md border-2 py-1 ${optionItem['settings' + viewport.type].position === 'absolute' ? 'text-cyan-400 border-cyan-400' : 'border-white'}`}>
                                                        <span className="px-2">Absolute</span>
                                                    </button>
                                                </div>
                                                {/*
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        POSITIONS TOP BOTTOM LEFT RIGHT
                                                        */}
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10">
                                                        <div
                                                            className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="text-[12px] font-bold">Top</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        top: {
                                                                            value: target.value,
                                                                            unit: positions.top.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "top",
                                                                            name: "top",
                                                                            value: "top-[" + target.value + positions.top.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.top.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        top: {
                                                                            value: positions.top.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "top",
                                                                            name: "top",
                                                                            value: "top-[" + positions.top.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.top.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10">
                                                        <div
                                                            className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="text-[12px] font-bold">Bottom</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        bottom: {
                                                                            value: target.value,
                                                                            unit: positions.bottom.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "bottom",
                                                                            name: "bottom",
                                                                            value: "bottom-[" + target.value + positions.bottom.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.bottom.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        bottom: {
                                                                            value: positions.bottom.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "bottom",
                                                                            name: "bottom",
                                                                            value: "bottom-[" + positions.bottom.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.bottom.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10">
                                                        <div
                                                            className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="text-[12px] font-bold">Left</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        left: {
                                                                            value: target.value,
                                                                            unit: positions.left.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "left",
                                                                            name: "left",
                                                                            value: "left-[" + target.value + positions.left.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.left.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        left: {
                                                                            value: positions.left.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "left",
                                                                            name: "left",
                                                                            value: "left-[" + positions.left.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.left.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                    <div
                                                        className="relative flex rounded-md border-[1px] border-white h-10">
                                                        <div
                                                            className="w-[40%] flex items-center justify-center border-r-[1px] h-full">
                                                            <span className="text-[12px] font-bold">Right</span>
                                                        </div>
                                                        <input
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        right: {
                                                                            value: target.value,
                                                                            unit: positions.right.unit
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "right",
                                                                            name: "right",
                                                                            value: "right-[" + target.value + positions.right.unit + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.right.value}
                                                            min={0}
                                                            type="number"
                                                            className="w-[60%] rounded-r-md appearance-none focus:outline-none bg-black pl-2 pr-8 text-nowrap truncate"/>
                                                        <select
                                                            onChange={
                                                                ({target}) => {
                                                                    setPositions({
                                                                        ...positions,
                                                                        right: {
                                                                            value: positions.right.value,
                                                                            unit: target.value
                                                                        }
                                                                    })
                                                                    onChangeInput({
                                                                        target: {
                                                                            id: "right",
                                                                            name: "right",
                                                                            value: "right-[" + positions.right.value + target.value + "]"
                                                                        }
                                                                    })
                                                                }
                                                            }
                                                            value={positions.right.unit}
                                                            className="absolute top-2/4 -translate-y-2/4 focus:outline-none rounded-none right-0 w-10 text-center h-8 bg-black appearance-none"
                                                            name="" id="">
                                                            {
                                                                units.map((unit, index) => {
                                                                    return (<option key={index * Math.random()}
                                                                                    value={unit}>{unit}</option>)
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </>
                ) : ""
                }
            </div>
        ) :
        (
            <Disclosure as="div" className="border-white py-5">
                <p className="text-white">
                    Select an item from tree view to see the settings
                </p>
            </Disclosure>
        );
};
