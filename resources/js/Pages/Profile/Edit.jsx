import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Link, Head } from '@inertiajs/react';


function ProfileEditBreadcrumbs(props) {
    return (
    <h2>
    <Link href={route(props.user.user_role_name + ".dashboard")}>
        Dashboard
    </Link> {'>'} <Link href={route(props.user.user_role_name + ".profile.edit")}>
            My Account
    </Link>
    </h2>);
}


export default function Edit({ auth, mustVerifyEmail, status, pagedata }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            sidenav={pagedata.sidenav}
            breadcrumbs={<ProfileEditBreadcrumbs user={auth.user}></ProfileEditBreadcrumbs>}
            notification={pagedata.topnav.notification}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">SuperAdmin-Profile</h2>}
        >
            <Head title="SuperAdmin-Profile" />

            <div className="py-12">
                <div className="  mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
