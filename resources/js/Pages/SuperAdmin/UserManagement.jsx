import { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, Head, useForm, router } from '@inertiajs/react';
import DangerButton from "@/Components/DangerButton";
import { CreateUserModal } from "./CreateUserModal";
import TableComponents from "../../Components/TableComponents";
import PaginationComponents from "../../Components/PaginationComponents";

const columns = [
    { header: "Account Type", key: "user_role_name" },
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Username", key: "username" },
    { header: "Department", key: "department_name" },
    { header: "Last Login", key: "lastlogin" },
];

function UserManagementHeader(props) {
    return (
        <div className="flex">
            <div>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Super-Admin User Management
                </h2>
            </div>
            <div className="ml-auto">
                <PrimaryButton onClick={() => props.setShowModal(true)}>
                    Create User
                </PrimaryButton>
            </div>
        </div>
    );
}

function UserManagementBreadcrumbs() {
    return (
        <h2>
            <Link href={route("SA.dashboard")}>Dashboard</Link>{" > "}
            <Link href={route("SA.user-management")}>User Management</Link>
        </h2>
    );
}

export default function Dashboard({ auth, pagedata }) {
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        userRoleId: "",
        name: "",
        email: "",
        username: "",
        departmentId: "",
        password: "",
    });

    const userRoles = {
        2: "Originator",
        3: "DocumentController",
    };

    const generateUsername = () => {
        const userRole = (userRoles[data.userRoleId] || "").toLowerCase();

        const nameParts = data.name ? data.name.split(" ") : [];
        const firstName = nameParts[0] ? nameParts[0].toLowerCase() : "";
        const lastName = nameParts[nameParts.length - 1]
            ? nameParts[nameParts.length - 1].toLowerCase()
            : "";

        const username = `${userRole}-${firstName}${lastName}`;

        setData((prevData) => {
            if (prevData.username !== username) {
                return { ...prevData, username };
            }
            return prevData;
        });
    };

    const generatePassword = () => {
        const firstName = data.name
            ? data.name.split(" ")[0].toLowerCase()
            : "";
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const password = `${firstName}${randomNumber}`;
        setData((prevData) => {
            if (prevData.password !== password) {
                return { ...prevData, password };
            }
            return prevData;
        });
    };

    useEffect(() => {
        if (data.name && data.userRoleId) {
            generateUsername();
        }
    }, [data.name, data.userRoleId]);

    useEffect(() => {
        if (data.name) {
            generatePassword();
        }
    }, [data.name]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("SA.create-user"), {
            onFinish: () => {
                reset("password", "password_confirmation");
                setShowModal(false);
            },
        });
    };

    const delete_user = (e,id) => {
        e.preventDefault();

        router.post(route('SA.delete-user'), { id })
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            sidenav={pagedata.sidenav}
            breadcrumbs={<UserManagementBreadcrumbs />}
            header={<UserManagementHeader setShowModal={setShowModal} />}
            notification={pagedata.topnav.notification}
        >
            <Head title="Super-Admin Create-User" />

            <div >
                <div className="  mx-auto sm:px-6 lg:px-8 space-y-8">
                    {/* This is the user create modal  */}
                    {showModal && (
                        <CreateUserModal
                            departments={pagedata.content.departments}
                            modalRef={modalRef}
                            data={data}
                            processing={processing}
                            errors={errors}
                            handleInputChange={handleInputChange}
                            submit={submit}
                        ></CreateUserModal>
                    )}
                </div>
            </div>

            <div className="py-12">
                <div className="  mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            User List
                        </h3>
                        <TableComponents
                            columns={columns}
                            data={pagedata.content.users.data}
                            renderActions={(rowData) => (
                                <>
                                    <DangerButton
                                        onClick={(e) => delete_user(e, rowData.id)}
                                    >
                                        Delete
                                    </DangerButton>
                                </>
                            )}
                        ></TableComponents>
                    </div>

                    <PaginationComponents paginationData={pagedata.content.users} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
