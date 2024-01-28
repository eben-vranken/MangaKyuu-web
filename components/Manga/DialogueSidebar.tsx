'use client';

// Icons
import { CaretDown, CaretLeft, CaretUp, List, Plus, Trash, X } from "@phosphor-icons/react"

// React
import { FunctionComponent, useEffect, useState } from "react";

// Hooks
import useGetTranslation from "@/api/getTranslation"

// Shortcuts
interface ShortcutActions {
    [key: string]: Function;
}


const DialogueSidebar: FunctionComponent = () => {
    const { getTranslation } = useGetTranslation();

    // Sidebar states
    const [sidebar, setSidebar] = useState(false);

    const handleSidebarToggle = () => {
        setSidebar((prevValue) => !prevValue);
    }

    // Dialogues
    const [dialogues, setDialogues] = useState<Array<{ speaker: string, dialogue: string }>>([]);
    const [addDialogueModel, setAddDialogueModel] = useState(false)

    const handleModalClick = () => {
        setAddDialogueModel((prevValue) => !prevValue);
    }

    const handleAddDialogue = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const speakerInput = event.currentTarget.speaker as HTMLInputElement;
        const dialogueInput = event.currentTarget.dialogue as HTMLTextAreaElement;

        const newDialogue = {
            speaker: speakerInput.value,
            dialogue: dialogueInput.value,
        };

        try {
            // Call the translation API
            const translationResponse = await getTranslation(
                'org-y1JIomEfsZwy4FtGuDUlmg1q',
                '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',
                newDialogue.dialogue
            );

            if (typeof translationResponse === 'string') {
                // Assuming the response content is a JSON string, parse it to an object
                const parsedContent = JSON.parse(translationResponse);
                // Extract the translated text from the parsed content
                const translatedText = parsedContent.sentence_meaning;
                // Update the dialogue content with the translation response
                newDialogue.dialogue = translatedText || newDialogue.dialogue;
            }

            // Add the new dialogue object to the dialogues array
            setDialogues((prevDialogues) => [...prevDialogues, newDialogue]);
        } catch (err: any) {
            console.error('Error fetching translation: ', err);
            console.error('Error fetching translation: ' + err.message);
        }

        // Close the modal after adding dialogue
        setAddDialogueModel(false);

        // Clear the form inputs
        speakerInput.value = '';
        dialogueInput.value = '';
    };

    const handleDeleteDialogue = (id: number) => {
        // Filter out the dialogue with the given id
        const updatedDialogues = dialogues.filter((_, index) => index !== id);

        // Update the state
        setDialogues(updatedDialogues);
    }


    const shortcutActions: ShortcutActions = {
        'Shift+A': handleModalClick,
    };

    // Register event listeners for shortcuts
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const combination = `${event.shiftKey ? 'Shift+' : ''}${event.key.toUpperCase()}`;
            const action = shortcutActions[combination];

            if (action) {
                action();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <>
            {/* Sidebar */}
            <aside className={`flex flex-col max-w-[500px] w-[500px] items-start gap-y-2 bg-body brightness-200 [&>*]:brightness-50 border-2 border-primary/15 p-2 rounded ${sidebar ? 'max-lg:absolute right-0 h-full max-w-[80%] drop-shadow-2xl z-10' : 'max-lg:max-w-7 items-center'}`}>
                {/* Sidebar Toggle */}
                <section className={`hidden max-lg:visible max-lg:flex flex-col text-text/50 cursor-pointer ${sidebar && "w-full items-end"}`} onClick={handleSidebarToggle}>
                    {sidebar ? <X size={30} /> : <CaretLeft size={20} weight="bold" />}
                </section>

                {/* Wrapper to control visibility without losing sidebar itself */}
                <section className={`w-full flex flex-col ${!sidebar && 'max-lg:hidden'}`}>
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
                                <section key={`${dialogue.speaker}:${id}`} className="bg-text/5 p-2 rounded-md text-text/50 flex flex-col gap-y-2 shadow-lg">
                                    <section className="flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-text/75">{dialogue.speaker}:</h2>

                                        <Trash size={25} weight="bold" className="text-red-500 hover:opacity-75 transition-opacity duration-200 cursor-pointer" onClick={() => handleDeleteDialogue(id)} />
                                    </section>

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
                </section>
            </aside>

            {/* Dialogue Modal */}
            <section className={`w-[350px] absolute bg-body brightness-200 [&>*]:brightness-50 z-10 rounded flex flex-col px-3  py-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-primary/5 ${addDialogueModel ? 'visible' : 'hidden'}`}>
                <section className="flex items-center justify-between">
                    {/* Title */}
                    <h1 className="text-xl font-semibold text-primary  mb-2"> Add dialogue</h1>

                    {/* Close modal */}
                    <X size={25} weight="bold" className="text-text/50 cursor-pointer" onClick={handleModalClick} />
                </section>

                {/* Dialogue information */}
                <form onSubmit={handleAddDialogue} className="flex flex-col gap-y-4">
                    <section className="flex flex-col">
                        <label htmlFor="speaker" className="font-medium opacity-50">Speaker:</label>
                        <input type="text" name="speaker" className="bg-text/5 rounded py-1 px-2 outline-none" required autoFocus />
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