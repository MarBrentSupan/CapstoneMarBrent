import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export function CreateDepartmentModal(props) {
    return (<div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div ref={props.modalRef} className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="flex flex-col w-full">
                        <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Department</h3>
                            <div className="mt-2">
                                <form onSubmit={props.submit} className="space-y-6">
                                    <div className="mb-4">
                                        <InputLabel htmlFor="name" value="Name" />
                                        <TextInput id="name" name="name" value={props.data.name} className="mt-1 block w-full" autoComplete="name" isFocused={true} onChange={e => props.setData('name', e.target.value)} required />
                                        <InputError message={props.errors.name} className="mt-2" />
                                    </div>
                                    <div className="mb-4">
                                        <InputLabel htmlFor="acronym" value="Acronym" />
                                        <TextInput id="acronym" name="acronym" value={props.data.acronym} className="mt-1 block w-full" autoComplete="acronym" onChange={e => props.setData('acronym', e.target.value)} required />
                                        <InputError message={props.errors.acronym} className="mt-2" />
                                    </div>
                                    <div className="mb-4">
                                        <InputLabel htmlFor="seriesnumberprefix" value="Series Number Prefix" />
                                        <TextInput id="seriesnumberprefix" name="seriesnumberprefix" value={props.data.seriesnumberprefix} className="mt-1 block w-full" autoComplete="seriesnumberprefix" onChange={e => props.setData('seriesnumberprefix', e.target.value)} required />
                                        <InputError message={props.errors.seriesnumberprefix} className="mt-2" />
                                    </div>
                                    <div className="flex justify-end">
                                        <PrimaryButton type="submit" disabled={props.processing}>
                                            Create
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
