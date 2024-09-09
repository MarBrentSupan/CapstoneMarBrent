import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Select } from '@headlessui/react';

export default function CreateDocumentManagement({ modalRef, data, setData, processing, errors, submit, pagedata }) {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto ">
            <div className="flex items-center justify-center min-h-screen ">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div ref={modalRef} className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg p-5">
                        <div className="flex flex-col w-full">
                            <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Document</h3>
                                <div className="mt-2">
                                    <form onSubmit={submit}>
                                        <div>
                                            <InputLabel htmlFor="name" value="Name" />
                                            <TextInput
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>
                                        <div className="mt-2">
                                            <InputLabel htmlFor="externalUrl" value="External URL" />
                                            <TextInput
                                                id="externalUrl"
                                                name="externalUrl"
                                                value={data.externalUrl}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('externalUrl', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.externalUrl} className="mt-2" />
                                        </div>
                                        <div className="mt-2">
                                            <InputLabel htmlFor="totalPages" value="Total Pages" />
                                            <TextInput
                                                id="totalPages"
                                                type="number"
                                                name="totalPages"
                                                value={data.totalPages}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('totalPages', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.totalPages} className="mt-2" />
                                        </div>
                                        <div className="mt-2">
                                            <InputLabel htmlFor="document_type" value="Document Type" />
                                            <Select className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-2 " onChange={(e) => setData('sourceDocumentId', e.target.value)}>
                                                {pagedata.content.sourcedocument.map((e) => (
                                                    <option key={e.id} value={e.id}>
                                                        {e.name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </div>
    
                                        <PrimaryButton className="mt-4" disabled={processing}>
                                            Create
                                        </PrimaryButton>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}