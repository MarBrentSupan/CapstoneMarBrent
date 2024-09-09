import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Select } from "@headlessui/react";

export function CreateUserModal(props) {
    return (<div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div ref={props.modalRef} className="bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <div className="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Create New User</h3>
                            <div className="mt-2">
                                <form onSubmit={props.submit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="userRoleId" value="User Role" />
                                            <Select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" name="userRoleId" onChange={props.handleInputChange} value={props.data.userRoleId}>
                                                <option value="">Select Role</option>
                                                <option value={2}>Originator</option>
                                                <option value={3}>Document Controller</option>
                                            </Select>
                                            <InputError message={props.errors.userRoleId} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="departmentId" value="Department" />
                                            <Select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" name="departmentId" onChange={props.handleInputChange} value={props.data.departmentId}>
                                                <option value="">Select Department</option>
                                                {props.departments.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                                            </Select>
                                            <InputError message={props.errors.departmentId} className="mt-2" />
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="name" value="Name" />
                                        <TextInput id="name" name="name" value={props.data.name} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" autoComplete="name" isFocused={true} onChange={props.handleInputChange} required />
                                        <InputError message={props.errors.name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="username" value="Username" />
                                        <TextInput id="username" name="username" value={props.data.username} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" autoComplete="username" onChange={props.handleInputChange} required readOnly />
                                        <InputError message={props.errors.username} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput id="email" type="email" name="email" value={props.data.email} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" autoComplete="email" onChange={props.handleInputChange} required />
                                        <InputError message={props.errors.email} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput id="password" type="text" name="password" value={props.data.password} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500" autoComplete="new-password" onChange={props.handleInputChange} required readOnly />
                                        <InputError message={props.errors.password} className="mt-2" />
                                    </div>

                                    <div className="flex justify-end">
                                        <PrimaryButton className="" disabled={props.processing}>
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
