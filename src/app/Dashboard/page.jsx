'use client'
import {useDisclosure as discloHOOK} from "@mantine/hooks";
import React, {useEffect, useState} from 'react'
import {
    setItemsDashboard as setItems,
    setMediaQuery,
    setOptionSelected,
    setOptions
} from '../../lib/features/dashboard/thunks'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faFloppyDisk, faTrash} from '@fortawesome/free-solid-svg-icons'
import {useSession} from 'next-auth/react'
import {DropMenu} from "./components/DropMenu";
import {DashboardPreview} from "./DashboardPreview.jsx";
import {fetchDataFromFirestore, saveDataToFirestore} from "../../settings/firebase/firebase";
import {
    IconClipboard,
    IconCopy,
    IconCut,
    IconDeviceDesktop,
    IconDeviceIpadHorizontal,
    IconDeviceLaptop,
    IconDeviceMobile,
    IconDeviceTv,
    IconComponents, IconX, IconCheck, IconBinaryTree, IconSettings
} from '@tabler/icons-react';
import {Disclosure} from "@headlessui/react";
import {Button, Drawer, Group, HoverCard, Popover, Text} from '@mantine/core';

export default function Dashboard() {

    const {data: session} = useSession();

    const viewports = [
        {value: "390px", type: "Mobile", breakpointID: "", icon: <IconDeviceMobile/>},
        {value: "680px", type: "Tablet", breakpointID: "sm", icon: <IconDeviceIpadHorizontal/>},
        {value: "1024px", type: "Laptop", breakpointID: "md", icon: <IconDeviceLaptop/>},
        {value: "1280px", type: "Desktop", breakpointID: "lg", icon: <IconDeviceDesktop/>},
        {value: "1536px", type: "TV", breakpointID: "xl", icon: <IconDeviceTv/>}
    ]

    const [itemsDashboard, setItemsDashboard] = useState();
    const [actualPage, setActualPage] = useState("")
    const [itemCopied, setItemCopied] = useState()
    const [optionItem, setOptionItem] = useState();
    const [unSaved, setUnSaved] = useState(false)
    const [viewport, setViewport] = useState({
        value: "1024px",
        type: "Desktop",
        breakpointID: "lg"
    });
    const [keepOptions, setKeepOptions] = useState(false)

    useEffect(() => {
        if (session && itemsDashboard === undefined) {
            getItemsDashboard();
        }
    }, [session]);

    async function saveItemsDashboard(bodySet) {
        const resp = await saveDataToFirestore(bodySet, session?.user.id);
        setUnSaved(false)
    }

    const onSelectItem = (value) => {
        setOptionItem(value);
    }
    const modifyItemsDashboard = (valorBuscado, nuevoValor) => {
        const modify = (obj) => {
            const newObj = structuredClone(obj)
            for (let key in newObj) {
                if (typeof newObj[key] === 'object') {
                    newObj[key] = modify(newObj[key]);
                } else if (newObj[key] === valorBuscado) {
                    if (newObj.hasOwnProperty('settings' + viewport.type)) {
                        if (keepOptions) {
                            nuevoValor.settingsMobile = {
                                ...nuevoValor.settingsMobile,
                                className: classNames(nuevoValor.settingsMobile, "")
                            };
                            nuevoValor.settingsTablet = {
                                ...nuevoValor.settingsTablet,
                                className: classNames(nuevoValor.settingsTablet, "sm")
                            };
                            nuevoValor.settingsLaptop = {
                                ...nuevoValor.settingsLaptop,
                                className: classNames(nuevoValor.settingsLaptop, "md")
                            };
                            nuevoValor.settingsDesktop = {
                                ...nuevoValor.settingsDesktop,
                                className: classNames(nuevoValor.settingsDesktop, "lg")
                            };
                            nuevoValor.settingsTV = {
                                ...nuevoValor.settingsTV,
                                className: classNames(nuevoValor.settingsTV, "xl")
                            };
                            newObj.settingsMobile = nuevoValor.settingsMobile;
                            newObj.settingsTablet = nuevoValor.settingsTablet;
                            newObj.settingsLaptop = nuevoValor.settingsLaptop;
                            newObj.settingsDesktop = nuevoValor.settingsDesktop;
                            newObj.settingsTV = nuevoValor.settingsTV;
                        } else {
                            nuevoValor['settings' + viewport.type] = {
                                ...nuevoValor['settings' + viewport.type],
                                className: classNames(nuevoValor['settings' + viewport.type], viewport.breakpointID)
                            };
                            newObj['settings' + viewport.type] = nuevoValor['settings' + viewport.type];
                        }

                    }
                    if (newObj.hasOwnProperty('value')) {
                        newObj.value = nuevoValor.value;
                    }
                }
            }
            return newObj;
        };
        console.log("modify", modify(itemsDashboard))
        setItemsDashboard({...modify(itemsDashboard)});
        setUnSaved(true)
    };
    const deleteItemDashboard = (valorBuscado) => {
        const modify = (obj) => {
            const newObj = structuredClone(obj);
            for (let key in newObj) {
                if (typeof newObj[key] === 'object') {
                    if (newObj[key].idUniqueIdentifier === valorBuscado) {
                        delete newObj[key]
                    } else {
                        newObj[key] = modify(newObj[key])
                    }
                }
            }
            return newObj;
        };

        function eliminarNulos(obj) {
            for (let clave in obj) {
                if (obj[clave] === null) {
                    delete obj[clave];
                } else if (typeof obj[clave] === 'object') {
                    if (Array.isArray(obj[clave])) {
                        obj[clave] = obj[clave].filter(item => item !== null);
                    }
                    eliminarNulos(obj[clave]);
                }
            }
            return obj;
        }

        setItemsDashboard(eliminarNulos(modify(itemsDashboard)));
        setUnSaved(true)
        setOptionItem(undefined)
    };

    const addSection = (section, idItem) => {
        console.log("addSection", section)
        const setId = (obj) => {
            const item = structuredClone(obj);
            for (let key in item) {
                if (typeof item[key] === 'object' && !key.includes('settings')) {
                    item[key] = setId(item[key]);
                }
                if (item.hasOwnProperty('idUniqueIdentifier')) {
                    let id = window.crypto.randomUUID() + item.label;
                    item.id = id;
                    item.idUniqueIdentifier = id;
                }
            }
            return item;
        }

        console.log("setID: ", setId(section))
        section = setId(section);
        console.log("AddSection2: ", section)

        if (idItem) {
            const addItemToSection = (obj) => {
                const newObj = structuredClone(obj)
                for (let key in newObj) {
                    if (newObj[key].hasOwnProperty('items')) {
                        newObj[key].items = addItemToSection(newObj[key].items);
                    }

                    if (newObj[key].idUniqueIdentifier === idItem) {
                        newObj[key].items = [
                            ...newObj[key].items,
                            section
                        ]
                        break
                    }
                }
                return newObj;
            };

            const sectionsToModify = addItemToSection(itemsDashboard.pages[actualPage].sections);
            setItemsDashboard({
                ...itemsDashboard,
                pages: {
                    ...itemsDashboard.pages,
                    [actualPage]: {
                        ...itemsDashboard.pages[actualPage],
                        sections: sectionsToModify
                    }

                }
            })

            return
        }
        setItemsDashboard({
            ...itemsDashboard,
            pages: {
                ...itemsDashboard.pages,
                [actualPage]: {
                    ...itemsDashboard.pages[actualPage],
                    sections: [
                        ...itemsDashboard.pages[actualPage].sections,
                        section
                    ]
                }

            }
        })
        setUnSaved(true)
    }

    function classNames(classes, query) {
        const elements = Object.entries(classes).map(([key, value]) => {
            if (value === "" || key === "className") return "";
            return (query ? query + ":" : "") + value;
        });
        return elements.join(' ');
    }
    const [openDrawerSettings, setOpenDrawerSettings] = useState(false)
    const [openDrawerTreeView, setOpenDrawerTreeView] = useState(false)


    if (itemsDashboard === undefined) {
        return (
            <div className="flex items-center justify-center text-white pt-36">
                <p>Loading dashboard... please wait</p>
            </div>
        );
    }
    return (
        <div className="min-h-full pt-4">
            <header className=" shadow">
                <div className="mx-auto relative grid grid-cols-2 ld:grid-cols-5 md:flex justify-between px-4 py-6 sm:px-6 lg:px-24">
                    <h1 className="col-span-2 flex items-center justify-around text-3xl font-bold tracking-tight text-white">
                        Dashboard
                        <Disclosure as="div"
                                    className="relative w-28 flex flex-col justify-center ml-4 border-white h-8">
                            {({open}) => (
                                <>
                                    <h3 className="flow-root">
                                        <div
                                            className={"border-2 rounded-md z-50 flex w-full items-center justify-between text-sm text-gray-400 hover:text-white px-2 " + (open ? "bg-black border-white" : "border-gray-500 bg-black")}>
                                            <span
                                                className="font-bold text-white">{actualPage.charAt(0).toUpperCase() + actualPage.slice(1)}</span>
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
                                    <Disclosure.Panel
                                        className="absolute border-2 border-white bg-black rounded-md z-50 top-10 w-full">
                                        {
                                            Object.keys(itemsDashboard.pages).map((page, index) => {
                                                return (
                                                    <Disclosure.Button
                                                        key={index}
                                                        onClick={() => {
                                                            setActualPage(page)
                                                            setOptionItem(undefined)
                                                        }}
                                                        className="w-full h-8 flex items-center">
                                                        <p className="text-white text-left px-2 text-sm text-nowrap truncate">
                                                            {page.charAt(0).toUpperCase() + page.slice(1)}
                                                        </p>
                                                    </Disclosure.Button>
                                                )
                                            })
                                        }
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    </h1>
                    <div className="col-span-2 lg:absolute lg:top-2/4 lg:left-2/4 lg:-translate-x-2/4 lg:-translate-y-2/4 flex items-center pt-5 pb-2 justify-center">
                        <h2 className="text-lg font-bold text-white">"{actualPage.charAt(0).toUpperCase() + actualPage.slice(1)}"
                            Page</h2>
                    </div>
                    <button onClick={() => saveItemsDashboard(itemsDashboard)}
                            className="col-span-2 text-white border-2 border-white hover:bg-gradient-to-r py-2 from-black via-zinc-700 to-black px-4 rounded-md">
                        Save &nbsp;<span className={unSaved ? 'text-red-500' : 'text-white'}>
                        <FontAwesomeIcon icon={faFloppyDisk}/>
                    </span>
                    </button>
                </div>
            </header>
            <main>
                <div className="mx-auto w-full min-h-[calc(80vh_-_64px)]">
                    <div className="h-full">
                        <div className="h-full">
                            <main className="mx-auto max-w-11/12 px-8 sm:px-6 lg:px-8 pt-6">
                                <section aria-labelledby="products-heading" className="h-[56vh] pt-3">
                                    <div className="grid grid-cols-1 relative gap-x-5 gap-y-4 lg:grid-cols-5 h-full">
                                        <div className="col-span-1 lg:col-span-5 grid grid-cols-2 lg:grid-cols-5 gap-y-3 py-2 h-15 rounded-md w-full bg-stone-950 border-2 border-stone-800">
                                            <div className="col-span-1 order-2 lg:order-1 flex justify-end lg:justify-start items-center px-2">
                                                <button
                                                    disabled={optionItem === undefined}
                                                    onClick={() => {
                                                        let id = window.crypto.randomUUID() + optionItem?.type;
                                                        setItemCopied({
                                                            ...optionItem,
                                                            id,
                                                            idUniqueIdentifier: id

                                                        })
                                                    }}
                                                    title="Copy"
                                                    className={`mx-2 rounded-md border-2 disabled:border-red-500 ${itemCopied !== undefined ? 'text-cyan-400 border-cyan-400' : 'text-white'}`}>
                                                    <IconCopy/>
                                                </button>
                                                <button
                                                    disabled={(!(itemCopied !== undefined && optionItem?.group !== "element"))}
                                                    onClick={() => {
                                                        optionItem ? addSection(itemCopied, optionItem?.idUniqueIdentifier) : addSection(itemCopied)
                                                        setItemCopied(undefined)
                                                    }}
                                                    title="Paste" className="mx-2 disabled:text-red-500">
                                                    <IconClipboard/>
                                                </button>
                                                <button title="Cut" className="mx-2">
                                                    <IconCut/>
                                                </button>
                                                {
                                                    optionItem !== undefined ?
                                                        <>
                                                            <Popover
                                                                classNames={{
                                                                    dropdown: "bg-stone-950 h-min m-0 p-0 text-center text-white"
                                                                }}
                                                                width={200} position="bottom"
                                                                clickOutsideEvents={['mouseup', 'touchend']}>
                                                                <Popover.Target>
                                                                    <button
                                                                        title={"Delete " + optionItem.type}
                                                                        className="mx-2">
                                                                        <FontAwesomeIcon icon={faTrash}/>
                                                                    </button>
                                                                </Popover.Target>
                                                                <Popover.Dropdown>
                                                                    <Text
                                                                        classNames={{
                                                                            root: "text-white h-full py-1 px-2"
                                                                        }}
                                                                        size="xs">Are you sure you want to delete the
                                                                        item?</Text>
                                                                    <div className="flex justify-around py-2">
                                                                        <button
                                                                            onClick={() => {
                                                                                deleteItemDashboard(optionItem.idUniqueIdentifier)
                                                                            }}
                                                                            className="text-lime-400">
                                                                            <IconCheck/>
                                                                        </button>
                                                                        <button
                                                                            onClick={() => {
                                                                                document.mo
                                                                            }}
                                                                            className="text-red-500">
                                                                            <IconX/>
                                                                        </button>
                                                                    </div>
                                                                </Popover.Dropdown>
                                                            </Popover>

                                                        </> : ""
                                                }
                                            </div>
                                            <div className="col-span-2 order-1 lg:order-2 lg:col-span-3 relative flex items-center justify-center">
                                                <div className="absolute md:hidden top-2/4 left-0 -translate-y-2/4">
                                                    <div className="relative">
                                                        <Drawer
                                                            classNames={{
                                                                body: "bg-stone-950",
                                                                content: "bg-stone-950",
                                                                header: "bg-stone-950"
                                                            }}
                                                             radius="md" opened={openDrawerTreeView} onClose={ () => { setOpenDrawerTreeView(!openDrawerTreeView) } }>
                                                            <DropMenu currentPage={actualPage} items={itemsDashboard.pages[actualPage]}
                                                                      optionSelected={optionItem}
                                                                      title="Tree View"
                                                                      type="tree-view"
                                                                      functions={onSelectItem} addSection={addSection}
                                                                      deleteItemDashboard={deleteItemDashboard}/>
                                                        </Drawer>
                                                        <Button onClick={ () => { setOpenDrawerTreeView(!openDrawerTreeView) } }>
                                                        <span className="italic text-xs">
                                                            <IconBinaryTree/>
                                                        </span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                {viewports.map((item, index) => {
                                                        return (
                                                            <Group key={index} justify="center">
                                                                <HoverCard shadow="md" closeDelay={0}>
                                                                    <HoverCard.Target>
                                                                        <Button
                                                                            onClick={() => {
                                                                                setViewport({
                                                                                    value: item.value,
                                                                                    type: item.type,
                                                                                    breakpointID: item.breakpointID
                                                                                })
                                                                            }}
                                                                            classNames={{
                                                                                root: "h-full m-0 px-1 " + (viewport.type === item.type ? "text-cyan-400" : " text-white"),
                                                                            }}>
                                                                            {item.icon}
                                                                        </Button>
                                                                    </HoverCard.Target>
                                                                    <HoverCard.Dropdown classNames={{
                                                                        dropdown: "bg-stone-950 h-min m-0 p-0 text-center"
                                                                    }}>
                                                                        <Text className="text-white h-full py-1 px-2"
                                                                              size="sm">
                                                                            {item.type} view
                                                                        </Text>
                                                                        <Text className="text-white h-full italic py-1 px-2"
                                                                              size="sm">
                                                                            width: {item.value}
                                                                        </Text>
                                                                    </HoverCard.Dropdown>
                                                                </HoverCard>
                                                            </Group>
                                                        )
                                                    }
                                                )}
                                                <div className="absolute md:hidden top-2/4 right-0 -translate-y-2/4">
                                                    <Drawer
                                                        classNames={{
                                                            body: "bg-stone-950",
                                                            content: "bg-stone-950",
                                                            header: "bg-stone-950"
                                                        }}
                                                        offset={8} radius="md" opened={openDrawerSettings} position="right" onClose={ () => { setOpenDrawerSettings(!openDrawerSettings) }}>
                                                        <DropMenu items={optionItem} viewport={viewport} keepOptions={keepOptions}
                                                                  modifyItemsDashboard={modifyItemsDashboard}
                                                                  title={optionItem !== undefined ? "Options for " + optionItem.label : "Options"}
                                                                  type="options"/>
                                                    </Drawer>
                                                    <Button onClick={ () => { setOpenDrawerSettings(!openDrawerSettings) } }>
                                                        <span className="italic text-xs">
                                                            <IconSettings/>
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="col-span-1 relative order-3">
                                                <div className="absolute top-2/4 left-0 -translate-y-2/4">
                                                    <Group justify="center">
                                                        <HoverCard shadow="md" closeDelay={0}>
                                                            <HoverCard.Target>
                                                                <Button
                                                                    onClick={() => {
                                                                        setKeepOptions(!keepOptions)
                                                                    }}
                                                                    classNames={{
                                                                        root: "h-full m-0 px-1 hover:bg-transparent hover:text-cyan-400" + (keepOptions ? " text-cyan-400" : " text-white"),
                                                                    }}>
                                                                    <span>Keep options</span>
                                                                    <IconComponents/>
                                                                </Button>
                                                            </HoverCard.Target>
                                                            <HoverCard.Dropdown classNames={{
                                                                dropdown: "bg-stone-950 h-min m-0 p-0 text-center"
                                                            }}>
                                                                <Text className="text-white h-full py-1 px-2" size="sm">
                                                                    Allow to apply the styles<br/>values of the
                                                                    component for<br/>all views.This option allow
                                                                    you <br/> to design faster on responsive design
                                                                </Text>
                                                            </HoverCard.Dropdown>
                                                        </HoverCard>
                                                    </Group>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden lg:block lg:cols-span-1">
                                            <DropMenu currentPage={actualPage} items={itemsDashboard.pages[actualPage]}
                                                      optionSelected={optionItem}
                                                      title="Tree View"
                                                      type="tree-view"
                                                      functions={onSelectItem} addSection={addSection}
                                                      deleteItemDashboard={deleteItemDashboard}/>
                                        </div>
                                        <div className="lg:col-span-3 bg-stone-950  border-dotted border-2 flex justify-center rounded-md border-stone-800 h-[60vh] overflow-visible shrink-0 overflow-x-hidden p-1">
                                            <div
                                                className={`overflow-x-hidden container outline outline-offset-2 outline-1 outline-white rounded-md h-full p-1`}
                                                style={{"width": viewport.value}}>
                                                <DashboardPreview idUniqueIdentifier={optionItem?.idUniqueIdentifier}
                                                                  viewport={viewport} onSelectItem={onSelectItem}
                                                                  components={itemsDashboard.pages[actualPage]}/>
                                            </div>
                                        </div>
                                        <div className="hidden lg:block lg:cols-span-1">
                                        <DropMenu items={optionItem} viewport={viewport} keepOptions={keepOptions}
                                                  modifyItemsDashboard={modifyItemsDashboard}
                                                  title={optionItem !== undefined ? "Options for " + optionItem.label : "Options"}
                                                  type="options"/>
                                        </div>
                                    </div>
                                </section>
                            </main>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

    async function getItemsDashboard() {
        try {
            const itemsDashboardResp = await fetchDataFromFirestore(session?.user.id);
            if (!itemsDashboardResp) {
                setItemsDashboard({
                    pages:
                        {
                            index: {
                                sections: [],
                                order: []
                            }
                        }
                });

                setActualPage("index")
                return
            }
            setItemsDashboard(
                itemsDashboardResp
            );
            setActualPage(Object.keys(itemsDashboardResp.pages)[0])
        } catch (error) {
            console.error('Error fetching itemsDashboard:', error);
        }
    }
}