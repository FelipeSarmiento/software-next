export const Project = ({ components, viewport }) => {
    console.log(viewport)
    const createContent = (section) => {
        const addSelectComponent = (obj) => {
            const newObj = structuredClone(obj)
            return newObj.map((component, index) => {
                if (component !== undefined) {
                    let className = `${component["settings" + viewport]?.className}`
                    className = className.replaceAll("sm:", "").replaceAll("md:", "").replaceAll("lg:", "").replaceAll("xl:", "");
                    switch (component.group) {
                        case "element":
                            switch (component.type) {
                                case "text":
                                    return (
                                        <p className={className} key={component.idUniqueIdentifier}>
                                            {component.text}
                                        </p>
                                    )
                                case "image":
                                    return (
                                        <img src={ component.src } className={className} key={component.idUniqueIdentifier}  alt={ component.alt }/>
                                    )
                            }
                        case "container":
                            switch (component.type) {
                                case "container":
                                    return (
                                        <container key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </container>
                                    )
                                case "link":
                                    return (
                                        <a key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </a>
                                    )
                                case "main":
                                    return (
                                        <main key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </main>
                                    )
                                case "div":
                                    return (
                                        <div key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </div>
                                    )
                                case "article":
                                    return (
                                        <article key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </article>
                                    )
                                case "section":
                                    return (
                                        <section key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </section>
                                    )
                                case "header":
                                    return (
                                        <header key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </header>
                                    )
                                case "nav":
                                    return (
                                        <nav key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </nav>
                                    )
                                case "aside":
                                    return (
                                        <aside key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </aside>
                                    )
                                case "form":
                                    return (
                                        <form key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </form>
                                    )
                                case "footer":
                                    return (
                                        <form key={component.idUniqueIdentifier}  className={className}>
                                            {component.items?.length > 0 ? addSelectComponent(component.items) : ""}
                                        </form>
                                    )
                            }
                    }
                }
            })
        };
        return addSelectComponent(section)
    }

    return (
        <>
            {createContent(components.sections)}
        </>
    )
}