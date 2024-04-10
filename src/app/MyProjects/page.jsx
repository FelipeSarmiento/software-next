'use client'
import {
    IconChevronLeft,
    IconChevronRight,
    IconEdit,
    IconExternalLink, IconSettings,
    IconSquareRoundedPlus,
    IconWorld, IconX
} from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import {Select, Switch, TagsInput} from '@mantine/core';
import React, {useEffect, useState} from "react";
import {getProjectsByUser, createProject, updateProject} from "@/data/page";
import Image from 'next/image'
import emptyBox from '@/settings/assets/images/emptyBox.png'
import SoftwareNextLogo from '@/settings/assets/images/software-next-logo.png'
import '@mantine/core/styles.css';
import Link from "next/link";


export default function Home() {

    const [opened, { open, close }] = useDisclosure(false);
    const [projects, setProjects] = useState([])
    const [currentProject, setCurrentProject] = useState()

    useEffect(() => {
        currentProject && open()
    }, [currentProject])

    useEffect(() => {
        getProjects()
    }, [opened]);

    return (
        <>
            <div className="min-h-[calc(100vh_-_84px)] px-4">
                <header className="h-32 md:px-12 mb-5 shadow">
                    <div className="mx-auto h-full flex items-center justify-between">
                        <h1 className="flex items-center justify-around text-2xl md:text-4xl font-bold tracking-tight text-white">
                            My Projects
                        </h1>
                        <button
                            className="px-2 md:px-6 border-2 border-white text-sm flex items-center space-x-2 font-bold text-white h-10 md:h-12 rounded-md hover:text-cyan-500 hover:border-cyan-500"
                            onClick={open}>
                            <span>New Project</span>
                            <IconSquareRoundedPlus/>
                        </button>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 md:w-max mx-auto gap-8">
                {
                    projects.length > 0 ? projects.map((project, index) => (
                            <div key={ project.idproject * index } className="w-full grid grid-cols-1 md:grid-cols-2 p-2 md:p-6 md:w-[40vw] h-full md:h-72 max-h-72 rounded-lg border-2 border-neutral-300">
                                <div className="border-2 flex items-center justify-center select-none border-neutral-300 rounded-md h-40 md:h-full">
                                    <Image src={ SoftwareNextLogo } alt="Software Next Logo" width={500} height={500} className="size-52 object-cover select-none rounded-md"/>
                                </div>
                                <div className="rounded-md h-52 flex flex-wrap md:h-full px-3 md:px-6 py-2 text-white">
                                    <div className="w-full relative h-1/5 flex flex-wrap items-center text-2xl font-bold py-1">
                                        <h3 className="text-cyan-500">{ project.projectname }</h3>
                                        <span className={`absolute top-2/4 -translate-y-2/4 right-0 ${project.ispublic ? 'text-green-500' : 'text-red-500'}`} title={ project.ispublic ? 'Is public' : 'Is not public' }>
                                            <IconWorld/>
                                        </span>
                                    </div>
                                    <div className="w-full h-2/5 py-1 overflow-hidden text-wrap">
                                        <p className="text-ellipsis">{ project.projectdescription }</p>
                                    </div>
                                    <div className="w-2/4 md:w-full h-1/5 flex flex-wrap space-x-2 items-center justify-center md:justify-start">
                                        { project.tags.map((tag, index) => (
                                            <span className="bg-stone-900 rounded-lg p-1 text-xs md:text-sm">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="w-2/4 md:w-full h-1/5 flex space-x-5 items-center justify-center">
                                        <Link target="_blank" href={"/" + project.projectpublicid}>
                                            <button className="flex space-x-2 hover:text-cyan-500">
                                                <IconExternalLink/>
                                                <span className="hidden md:block">Visit</span>
                                            </button>
                                        </Link>
                                        <Link href={"/MyProjects/Dashboard/" + project.projectpublicid}>
                                            <button className="flex space-x-2 hover:text-cyan-500">
                                                <IconEdit/>
                                                <span className="hidden md:block">Dashboard</span>
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setCurrentProject({
                                                    idproject: project.idproject,
                                                    project_name: project.projectname,
                                                    project_description: project.projectdescription,
                                                    tags: project.tags,
                                                    isPublic: project.ispublic,
                                                    typeproject: project.typeproject,
                                                    projectpublicid: project.projectpublicid
                                                })
                                            }}
                                            className="flex space-x-2 hover:text-cyan-500">
                                            <IconSettings/>
                                            <span className="hidden md:block">Settings</span>
                                        </button>
                                    </div>
                                </div>
                        </div>
                    )): (
                        <div className="col-span-2 w-full py-24 h-full flex flex-col items-center justify-center">
                            <span className="text-white">
                                <Image width={500} height={100} src={emptyBox} alt="Empty box" className="size-32 md:size-60"/>
                            </span>
                            <span className="text-white font-bold text-2xl md:text-4xl">
                                No projects yet
                            </span>
                        </div>
                    )
                }
                </div>
            </div>
            {opened && <ModalContent project={ currentProject } close={ close } />}
        </>
    )

     async function getProjects(){
        setProjects(await getProjectsByUser().then((response) => {return response.projects}))
    }
}

const ModalContent = ({ close, project }) => {
    const [projectForm, setProjectForm] = useState()

    useEffect(() => {
        if (project) {
            setProjectForm({
                idProject: project.idproject,
                project_name: project.project_name,
                project_description: project.project_description,
                tags: project.tags,
                isPublic: project.isPublic,
                type_project: project.typeproject
            })
            setTags(project.tags)
        } else {
            setProjectForm({
                project_name: '',
                project_description: '',
                tags: [],
                isPublic: false,
                type_project: '',
            })
        }
    }, []);

    const handleProjectForm = async(event) => {
        event.preventDefault()
        if (project) {
            await updateProject({...projectForm, tags: tags}).then(() => {
                close()
            })
            return
        }
        // Create project
        await createProject({...projectForm, tags: tags, project_public_id: projectForm.project_name.replaceAll(" ", "-") + "-" + window.crypto.randomUUID()}).then(() => {
            close()
        })
    }

    const [templateSelected, setTemplateSelected] = useState(0)
    const templates = [
        {
            idTemplate: 1,
            name: 'Template 1',
            description: 'Description 1',
        },
        {
            idTemplate: 2,
            name: 'Template 2',
            description: 'Description 2',
        },
        {
            idTemplate: 3,
            name: 'Template 3',
            description: 'Description 3',
        },
    ]
    const [tags, setTags] = useState([])

    return (
        <div className="fixed top-0 left-0 w-full py-20 px-2 flex md:items-center justify-center h-screen  bg-stone-950/90">
            <div className="relative px-3 py-2 md:py-3 md:px-6 w-full md:w-2/6 bg-black border-2 overflow-y-auto border-stone-500 text-white rounded-lg">
                <h2 className="text-lg font-bold text-center">{ project ? 'Edit Project' : 'Create a new Project' }</h2>
                <div className="">
                    <form onSubmit={ handleProjectForm }>
                        <div className="flex flex-wrap md:grid grid-cols-2 gap-x-8 w-full">
                            <div className="col-span-2 w-full">
                                <div className="mt-4">
                                    <label htmlFor="project-name" className="block text-sm font-bold py-1">Project Name</label>
                                    <input onChange={ (event) => {
                                        setProjectForm({ ...projectForm, project_name: event.target.value })
                                    } } type="text" name="project_name" id="project_name" value={ projectForm?.project_name } className="w-full h-10 rounded-md bg-stone-950 border-2 border-stone-800 px-2" />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="project-description" className="block text-sm font-bold py-1">Description</label>
                                    <textarea onChange={ (event) => {
                                        setProjectForm({ ...projectForm, project_description: event.target.value })
                                    }} id="project_description" name="project_description" value={ projectForm?.project_description } rows={3} className="h-20 w-full rounded-md bg-stone-950 border-2 border-stone-800 px-2 max-h-32" />
                                </div>
                                <div className="relative text-lg mt-4">
                                    <TagsInput
                                        classNames={{
                                            input: 'h-10 w-full rounded-md text-white placeholder:text-white bg-stone-950 border-2 border-stone-800 px-2',
                                            pill: 'bg-stone-800 text-white',
                                            label: 'text-sm block font-bold py-1'
                                        }}
                                        data={[]}
                                        value={ tags }
                                        onChange={setTags}
                                        label="Tags" placeholder="Tags" />
                                </div>
                                <div className="mt-4 grid grid-cols-2">
                                    <div className="flex items-center justify-center">
                                        <Switch
                                            classNames={{
                                                root: '',
                                                track: 'border-2 border-stone-500 ' + (projectForm?.isPublic ? 'bg-blue-800' : 'bg-stone-800'),
                                            }}
                                            checked={projectForm?.isPublic}
                                            color="blue"
                                            onChange={(event) => { setProjectForm({...projectForm, isPublic: event.currentTarget.checked}) }}
                                            label="Is Public"
                                        />
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <Select
                                            classNames={{
                                                root: 'w-3/4 mx-auto',
                                                input: "bg-stone-950 text-white border-2 border-stone-800 rounded-md h-10 text-md font-bold text-center",
                                                dropdown: "bg-stone-950 border-stone-800 text-white",
                                                option: "hover:bg-stone-950 border-2 border-transparent hover:border-cyan-500 hover:text-cyan-500 text-white font-bold text-md"
                                            }}
                                            value={projectForm?.type_project}
                                            onChange={(value) => { setProjectForm({...projectForm, type_project: value}) }}
                                            placeholder="Type of Project"
                                            data={['Ecommerce', 'Blog', 'Portfolio', 'Landing Page']}
                                            checkIconPosition="right"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="hidden col-span-1 w-full">
                                <div className="h-80 md:h-full">
                                    <div className="h-1/6 flex items-end py-1 justify-center border-b-2 font-bold text-lg">
                                        <span>Template </span><span className="text-cyan-500 px-1 text-sm">comming soon!!</span>
                                    </div>
                                    <div className="h-5/6">
                                        <div className="h-5/6 flex items-center justify-center">
                                            { templates[templateSelected].name }
                                        </div>
                                        <div className="relative h-1/6 text-white flex items-center">
                                            <button type="button"
                                                    onClick={() => {
                                                        if (templateSelected === 0) {
                                                            setTemplateSelected(templates.length - 1)
                                                            return
                                                        }
                                                        setTemplateSelected(templateSelected - 1)
                                                    }}
                                                    className="absolute left-2">
                                                <IconChevronLeft/>
                                            </button>
                                            <button type="button"
                                                    onClick={() => {
                                                        if (templateSelected === templates.length - 1) {
                                                            setTemplateSelected(0)
                                                            return
                                                        }
                                                        setTemplateSelected(templateSelected + 1)
                                                    }}
                                                    className="absolute right-2">
                                                <IconChevronRight/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 w-full flex items-center justify-center py-3 mt-5">
                                <button type="submit" className="w-28 rounded-md py-3 border-2 border-stone-800 font-bold">
                                    { project ? 'Update' : 'Create' }
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <button onClick={close} className="absolute top-3 right-3">
                    <IconX/>
                </button>
            </div>
        </div>
    )
}