'use client';

// Icons
import { CaretDown, CaretUp, Plus, X } from "@phosphor-icons/react"

// React
import { FunctionComponent, useEffect, useState } from "react";

const DialogueSidebar: FunctionComponent = () => {
    const [dialogues, setDialogues] = useState<Array<{ speaker: string, dialogue: string }>>([]);
    const [addDialogueModel, setAddDialogueModel] = useState(false)

    const handleModalClick = () => {
        setAddDialogueModel(!addDialogueModel);
    }

    const handleAddDialogue = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Get values from the form
        const speakerInput = event.currentTarget.speaker as HTMLInputElement;
        const dialogueInput = event.currentTarget.dialogue as HTMLTextAreaElement;

        // Create a new dialogue object
        const newDialogue = {
            speaker: speakerInput.value,
            dialogue: dialogueInput.value
        };

        // Add the new dialogue object to the dialogues array
        setDialogues(prevDialogues => [...prevDialogues, newDialogue]);


        // Close the modal after adding dialogue
        setAddDialogueModel(false);

        // Clear the form inputs
        speakerInput.value = '';
        dialogueInput.value = '';
    }

    const handleGetData = () => {

    }

    return (
        <>
            {/* Sidebar */}
            <aside className="flex flex-col max-w-[500px] w-[500px] items-start gap-y-2">
                {/* Title */}
                <section className="flex justify-between items-center w-full">
                    <h1 className="font-bold text-lg text-primary">Translation</h1>

                    {/* Add Button */}
                    <section className="p-1 aspect-square bg-primary cursor-pointer rounded-lg hover:opacity-75" onClick={handleModalClick}>
                        <Plus size={20} weight="bold" />
                    </section>
                </section>

                {/* Dialogue List */}
                <section className="flex flex-col mt-1 w-full gap-y-2">
                    {/* Individual Dialogue */}
                    {dialogues.length > 0 ? (
                        dialogues.map((dialogue, id) => (
                            <section key={`${dialogue.speaker}:${id}`} className="bg-text/5 p-2 rounded-md text-text/50 flex flex-col gap-y-2 shadow-lg opacity-80 hover:opacity-100 hover:cursor-pointer">
                                <h2 className="text-lg font-semibold text-text/75">{dialogue.speaker}</h2>

                                {/* Translations */}
                                <section className="flex flex-col gap-y-1">
                                    {/* Japanese */}
                                    <section className="flex items-center gap-x-1">
                                        <span className="font-bold text-primary">
                                            Japanese:
                                        </span>
                                        <span>
                                            {dialogue.dialogue}
                                        </span>
                                    </section>

                                    {/* Output Language */}
                                    <section className="flex items-center gap-x-1">
                                        <span className="font-bold">
                                            English:
                                        </span>
                                        <span>
                                            Oh...
                                        </span>
                                    </section>
                                </section>

                                {/* Toggle */}
                                <section className="flex gap-x-1 items-center text-text/25 cursor-pointer">
                                    <CaretDown size={30} weight="bold" />
                                    <span className="border-b-2 border-text/25 w-full "></span>
                                </section>
                            </section>
                        ))
                    ) : (
                        <section className="bg-text/5 p-2 rounded-md text-text/50 flex flex-col items-center justify-center h-20 font-semibold gap-y-2 shadow-lg opacity-80 hover:opacity-100 hover:cursor-pointer">
                            <span>No dialogues available</span>
                        </section>
                    )}
                </section>
            </aside>

            {/* Dialogue Modal */}
            <section className={`w-[350px] absolute bg-text/5 rounded flex flex-col p-2 py-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${addDialogueModel ? 'visible' : 'hidden'}`}>
                <section className="flex items-center justify-between">
                    {/* Title */}
                    <h1 className="text-xl font-bold mb-2"> Add dialogue</h1>

                    {/* Close modal */}
                    <X size={25} weight="bold" className="text-text/50 cursor-pointer" onClick={handleModalClick} />
                </section>

                {/* Dialogue information */}
                <form onSubmit={handleAddDialogue} className="flex flex-col gap-y-4">
                    <section className="flex flex-col">
                        <label htmlFor="speaker" className="font-medium opacity-50">Speaker:</label>
                        <input type="text" name="speaker" className="bg-text/5 rounded py-1 px-2 outline-none" required />
                    </section>
                    <section className="flex flex-col">
                        <label htmlFor="dialogue" className="font-medium opacity-50">Dialogue: </label>

                        {/* I would love for this to be a multiline input, similar to a textarea but textarea has really annoying functionality and causes enter for submit to be disabled for the form. I could fix this by adding a seperate function that checks keyevents on the textarea but this is janky so single-lined input it is for now, I'll come back to this for sure  */}
                        <input name="dialogue" className="bg-text/5 rounded py-1 px-2 outline-none" required />
                    </section>

                    <button type="submit" className="button mx-auto">Submit</button>
                </form>
            </section>
        </>
    )
}

export default DialogueSidebar