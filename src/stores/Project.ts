import { browser } from "$app/environment"
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Project } from "../models/Project";
import aj from "../util/AJ";

let _pro

if(browser) {
    const localPro = localStorage.getItem("last_project");
    if (localPro) {
        _pro = JSON.parse(localPro) as Project;
    }
}

export const projects: Writable<Project[]> = writable<Project[]>([]);

export const project: Writable<Project | null> = writable<Project | null>(_pro);

class ProjectViewModel {

    create = async (_project: Project): Promise<Project> => {
        const res = await aj().user().POST_PROTECTED<Project, Project>("/project", _project);
        projects.update(pros => [...pros, res.data]);
        return res.data;
    }

    set = async (_project: Project): Promise<void> => {
        localStorage.setItem("last_project", JSON.stringify(_project));
        project.set(_project);
    }

    find = async (projectId: string): Promise<Project> => {
        const res = await aj().user().GET_PROTECTED<Project>(`/project/${projectId}`);
        return res.data;
    }

    findAll = async (organisationId: string): Promise<Project[]> => {
        const res = await aj().user().GET_PROTECTED<Project[]>(`/project/organisation/${organisationId}`);
        projects.set(res.data);
        return res.data;
    }

    update = async (_project: Project): Promise<Project> => {
        const res = await aj().user().PUT_PROTECTED<Project, Project>(`/project/${_project.projectId}`, _project);
        return res.data;
    }

    delete = async (_project: Project): Promise<void> => {
        await aj().user().DELETE_PROTECTED<null>(`/project/${_project.projectId}`);
    }

}

const pvm = () => {
    return new ProjectViewModel();
}

export default pvm;