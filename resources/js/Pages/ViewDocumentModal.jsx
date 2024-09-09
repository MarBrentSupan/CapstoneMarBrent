import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';

export default function ViewDocumentModal({ modalRef, data, errors, onClose, user }) {
    const [activeTab, setActiveTab] = useState('general');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModal1Open, setIsModal1Open] = useState(false);
    const [isModal2Open, setIsModal2Open] = useState(false);
    const [isModal3Open, setIsModal3Open] = useState(false);
    const [isModal4Open, setIsModal4Open] = useState(false);
    const [isModal5Open, setIsModal5Open] = useState(false);
    const [isModal6Open, setIsModal6Open] = useState(false);
    
    const [notice, setNotice] = useState("");
    const openAddRevisionNotesModal = () => setIsModalOpen(true);
    const closeAddRevisionNotesModal = () => setIsModalOpen(false);
    const openComplyRevisionNotesModal= () => setIsModal1Open(true);
    const closeComplyRevisionNotesModal = () => setIsModal1Open(false);
    const openAddRevisionModal = () => setIsModal6Open(true);
    const closeAddRevisionModal = () => setIsModal6Open(false);

    const openArchivePetitionModal= () => setIsModal3Open(true);
    const closeArchivePetitionModal= () => setIsModal3Open(false);
    const [reason, setReason]=useState("");
    
    const openApproveLinkModal= () => setIsModal2Open(true);
    const closeApproveLinkModal = () => setIsModal2Open(false);
    const openAcceptArchivePetitionModal = () => setIsModal4Open(true);
    const closeAcceptArchivePetitionModal = () => setIsModal4Open(false);
    const openRejectArchiveForm = () => setIsModal5Open(true);
    const closeRejectArchiveForm = () => setIsModal5Open(false);
    const [rejectionReason, setRejectionReason]=useState("");
    
    const [externalLink, setExternalLink]= useState("");
    const [modification, setModification]= useState("");
    
    const [approveLink, setApproveLink]= useState("");

    const [archiveLink, setArchiveLink] = useState("");

    const [revisionLink, setRevisionLink] = useState("");
    const [originatorNotes, setOriginatorNotes] = useState("");
    const add_revision_notice = (e,id) => {
        e.preventDefault();
        router.post(route('DC.add_revision_notice'), { id,notice }, { onFinish: () => { setIsModalOpen(false); onClose(); }})
    };

    const comply_revision_notice = (e,id) => {
        e.preventDefault();
        router.post(route('O.comply_revision_notice'), { id,externalLink,modification }, {
            onFinish: () => { setIsModal1Open(false) ; onClose(); } 
        });
    };

    const approve_document = (e,id) => {
        e.preventDefault();
        router.post(route('DC.approve_document'), { id, approveLink }, {
            onFinish: () => { setIsModal2Open(false) ; onClose(); } 
        })
    };

    const archive_document = (e,id) => {
        e.preventDefault();
        router.post(route('DC.archive_document'), { id, archiveLink }, {
        onFinish: () => { setIsModal4Open(false) ; onClose(); }} )
    };

    const petition_archive = (e,id) => {
        e.preventDefault();
        router.post(route('O.petition_archive'), { id, reason }, {
            onFinish: () => { setIsModal3Open(false) ; onClose(); } 
        })
    };

    const reject_archive_document = (e,id) => {
        e.preventDefault();
        router.post(route('DC.reject_archive_document'), { id, rejectionReason }, {
            onFinish: () => { setIsModal5Open(false) ; onClose(); } 
        })
    };

    const add_document_revision = (e,id) => {
        e.preventDefault();
        router.post(route('O.add_document_revision'), { id,revisionLink,originatorNotes }, {
            onFinish: () => { setIsModal6Open(false) ; onClose(); } 
        })
    };

    console.log(user);
    return (
        <div ref={modalRef} className="fixed z-1 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-6/12">
                <div><span className='font-bold'>Document Information</span> <span className={`ms-2 text-sm inline-block px-2 py-1 text-white rounded-full whitespace-nowrap 
                    ${data.status === "In progress" ? 'bg-yellow-500' :
                    data.status === "Approved" ? 'bg-green-500' :
                    data.status === "Needs Update" ? 'bg-blue-500' :
                    data.status === "Archived" ? 'bg-red-500' :
                    'bg-gray-500'}`}>{data.status}</span>
                </div>
                {/* Tab Navigation */}
                <div className="border-b mt-3 border-gray-200 mb-4 top-0 bg-white z-10">
                    <ul className="flex space-x-4">
                        <li
                            className={`cursor-pointer px-4 py-2 rounded-t-sm ${activeTab === 'general' ? 'border-b-2 bg-blue-200' : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            General Data
                        </li>
                        <li
                            className={`cursor-pointer px-4 py-2 rounded-t-sm ${activeTab === 'properties' ? 'border-b-2 bg-blue-200' : ''}`}
                            onClick={() => setActiveTab('properties')}
                        >
                            Document Notices (from DC/QMR)
                        </li>
                    </ul>
                </div>
                {/* Tab Content */}
                <div className="relative h-[50vh] overflow-y-auto scrollbar-hide">        
                    {activeTab === 'general' && (
                        <div className="pt-4 space-y-4 overflow-y-auto scrollbar-hide">
                            <table className="w-full text-left rounded-sm">
                                <tbody>
                                    <tr>
                                        <th className="border px-2 py-2 text-gray-600">Name</th>
                                        <td className="border px-4 py-2">{data.name || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th className="border px-2 py-2 text-gray-600">Type</th>
                                        <td className="border px-4 py-2">{data.source_document?.name || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th className="border px-2 py-2 text-gray-600">Total Pages</th>
                                        <td className="border px-4 py-2">{data.totalPages || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th className="border px-2 py-2 text-gray-600">Department</th>
                                        <td className="border px-4 py-2">{data.department?.name || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th className="border px-2 py-2 text-gray-600">Submitted by</th>
                                        <td className="border px-4 py-2">{data.originator_name || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th className="border px-2 py-2 text-gray-600">Link</th>
                                        <td className="border px-4 py-2 truncate max-w-[200px] "><a href={data.latest_link || 'N/A'} target="_blank" rel="noopener noreferrer" className='underline text-blue-500 break-words'>{data.latest_link || 'N/A'}</a></td>
                                    </tr>
                                    <tr>
                                        <th className="border px-2 py-2 text-gray-600">Series Number</th>
                                        <td className="border px-4 py-2">{data.seriesNumber || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th className="border px-2 py-2 text-gray-600">Revision Number</th>
                                        <td className="border px-4 py-2">{data.revision_count || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th className="border px-2 py-2 text-gray-600">Date Created</th>
                                        <td className="border px-4 py-2">{data.created_at || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th className="border px-2 py-2 text-gray-600">Last Updated</th>
                                        <td className="border px-4 py-2">{data.updated_at || 'N/A'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'properties' && (
                        <div className="pt-4 space-y-4 h-full overflow-y-auto scrollbar-hide">
                            {data.documents && data.documents.length > 0 ? (
                                data.documents.map((doc, index) => (
                                    <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50">
                                        <div className="m-3">
                                            <div className="flex justify-between mb-1">
                                                <h4 className="font-semibold text-gray-700">{doc.status != 'Archive Petition' ? `Revision ${doc.revision}` : ''} </h4>
                                                <p className="text-sm text-gray-600">{doc.status || 'N/A'}</p>
                                            </div>
                                            <hr />
                                            <div className='flex justify-between my-3'>
                                                <div>
                                                    <p className="text-xs">Source Document Type:</p>
                                                    <span className="text-xs text-gray-600"> {doc.sourcedocumentname || 'N/A'}</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs">Effectivity Date:</p>
                                                    <span className="text-xs text-gray-600">{data.effectivity_date}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between my-3">
                                                {doc.status === "Creation" && (
                                                    <div className="flex-1 sm:max-w-[200px] md:max-w-[300px] lg:max-w-[300px] xl:max-w-[500px]">
                                                        <p className="text-sm">External URL:</p>
                                                        <span 
                                                            className={`text-sm ${doc.externalUrl ? 'text-blue-600' : 'text-gray-600'} break-words`}
                                                        >
                                                            {doc.externalUrl || 'N/A'}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="flex-1 text-right">
                                                    <p className="text-xs">Approval Date:</p>
                                                    <span className="text-xs text-gray-600"> {doc.approvalDate || 'N/A'}</span>
                                                </div>
                                            </div>

                                            <div className='flex justify-between mb-2'>
                                                {doc.dcNotes &&
                                                <div>
                                                    <p className="text-sm">Document Controller Notes:</p>
                                                    <span className={`text-sm text-gray-600'}`}>
                                                    {doc.dcNotes || 'N/A'}
                                                    </span>
                                                </div>
                                                }
                                                {/* <div>
                                                    <p className="text-xs">Updated At:</p>
                                                    <span className={`text-xs text-gray-600'}`}>
                                                        {doc.updated_at || 'N/A'}
                                                    </span>
                                                </div> */}
                                            </div>
                                            



                                            {/* Revision Details */}
                                            {doc.RevisionDate &&
                                            <div className='flex flex-col bg-gray-200 rounded-lg p-4'>
                                                <div className="flex justify-between mb-2 border-b-black-3">
                                                    <h4 className="font-semibold text-gray-700">Comply Details</h4>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <div>
                                                        <p className="text-sm">External Url</p>
                                                        <a href={doc.externalUrl} className="text-xs text-blue-500" target="_blank" rel="noopener noreferrer">{doc.externalUrl}</a>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm">Date Submission</p>
                                                        <p className="text-xs">{doc.RevisionDate}</p>
                                                    </div>

                                                </div>
                                                <div className="flex flex-grow mb-2">
                                                    <div>
                                                        <p className="text-sm">Originator Notes</p>
                                                        <p className="text-xs">{doc.originatorNotes}</p>
                                                    </div>

                                                </div>
                                                <div className='-mx-2 mt-2'>
                                                {user.userRoleId === 3 && data.status === "In progress"   && index === 0 && (
                                                    <>
                                                        <PrimaryButton onClick={openApproveLinkModal}>APPROVE</PrimaryButton>

                                                        {user.userRoleId === 3 && data.status === "In progress" && (
                                            <>
                                                <PrimaryButton onClick={openAddRevisionNotesModal}>Decline</PrimaryButton>
                                            </>
                                        )} 
                                                    </> 
                                                )}
                                                </div>                                      
                                            </div>
                                            }

                                            {/* Approval Details */}
                                            {
                                            doc.ApprovedLink &&
                                            <div className='flex flex-col bg-gray-200 rounded-lg p-4 mt-2'>
                                                <div className="flex justify-between mb-2 border-b-black-3">
                                                    <h4 className="font-semibold text-gray-700">{doc.status != 'Archive Petition' ? "Approval Details" : "Details"}</h4>
                                                </div>

                                                <div className="flex justify-between mb-2">
                                                    <div>
                                                        <p className="text-sm">External Url</p>
                                                        <a href={doc.externalUrl} className="text-xs text-blue-500" target="_blank" rel="noopener noreferrer">{doc.ApprovedLink}</a>
                                                    </div>
                                                    <div className=''>
                                                    <p className="text-sm">Approval Date</p>
                                                    <p className="text-xs">{doc.ApprovalDate}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            }

                                            {/* Archive Petition */}
                                            {doc.status=="Archive Petition" && 
                                                <div className='flex-col bg-gray-200 rounded-lg p-4 mt-2'>
                                                    <div className="flex justify-between mb-2 border-b-black-3">
                                                        <h4 className="font-semibold text-gray-700">Archive Petition Details</h4>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="text-sm">Petition Reason</p>
                                                                <p className="text-xs">{doc.originatorNotes}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm">Petition Date</p>
                                                                <p className="text-xs">{doc.created_at}</p>
                                                            </div>
                                                        </div>
                                                        {doc.dcNotes && (
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="text-sm">Document Controller Notes:</p>
                                                                <p className="text-xs">{doc.dcNotes}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm">Decision Date</p>
                                                                <p className="text-xs">{doc.ApprovalDate}</p>
                                                            </div>
                                                        </div>
                                                        )}


                                                        <div>

                                                        </div>
                                                    </div>

                                                    {data.status === 'In progress' && user.userRoleId == 3 && index === 0 &&(
                                                        <>
                                                            <div className="-mx-3 mt-2">
                                                                <PrimaryButton onClick={openAcceptArchivePetitionModal}>Accept</PrimaryButton>
                                                                <DangerButton onClick={openRejectArchiveForm}>Reject</DangerButton>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            }
                                        </div>
                                        <div>
                                            {data.status === 'Needs Update' && user.userRoleId == 2 && index === 0 &&(
                                                <PrimaryButton onClick={openComplyRevisionNotesModal}>
                                                    Comply
                                                </PrimaryButton>
                                            )}
                                        </div>

                                        {user.userRoleId === 3 && (doc.status === "Creation" && !doc.ApprovedLink)   && index === 0 && (
                                            <>
                                                <PrimaryButton onClick={openApproveLinkModal}>Approve</PrimaryButton>

                                                {user.userRoleId === 3 && data.status === "In progress" && (
                                                    <>
                                                        <PrimaryButton onClick={openAddRevisionNotesModal}>Add Revision Notice</PrimaryButton>
                                                    </>
                                                )} 
                                            </>
                                            
                                        )}
                                             
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No document notices available.</p>
                            )}
                        </div>
                    )}
                </div>
                {/* Footer Modal */}
                <div className="mt-4 flex justify-between bottom-0 bg-white z-10 py-4">
                    
                    {user.userRoleId==2 && data.status ==="Approved" &&
                        <>
                            <PrimaryButton onClick={openAddRevisionModal}>Revise</PrimaryButton>
                            <PrimaryButton onClick={openArchivePetitionModal}>Archive</PrimaryButton>
                       </>
                    
                    }
                    <PrimaryButton onClick={onClose}>Close</PrimaryButton>
                </div>
            </div>

        {/* Add Revision Notes Modal */}
        {isModalOpen && (
            <div className="fixed z-100 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="relative flex flex-wrap w-6/12 flex-col overflow-hidden rounded-lg bg-white shadow">
                    <div className="flex items-start justify-between rounded-t border-b p-5">
                        <h3 className="text-xl font-medium text-gray-900">Document Notice Form</h3>
                    </div>
                    <div className="flex-1 overflow-auto max-w-full p-6 max-w">
                        <form className="flex flex-col gap-3 text-sm">
                            <p className="truncate max-w-full">
                                Document Reference: &nbsp;
                                <a
                                    href={data.latest_link || '#'}
                                    className="text-blue-700 underline break-words" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {data.latest_link || 'N/A'}
                                </a>
                            </p>
                            <hr />
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="w-full sm:w-1/2 flex flex-col gap-1">
                                    <p className="text-sm sm:text-base">Source Document Type</p>
                                    <input 
                                        name="nature" 
                                        className="rounded-lg border p-2 text-sm sm:text-base" 
                                        value={data.source_document.name} 
                                        readOnly 
                                        required 
                                    />
                                </div>
                                <div className="w-full sm:w-1/2 flex flex-col gap-1">
                                    <p className="text-sm sm:text-base">Nature of Modification</p>
                                    <input 
                                        name="nature" 
                                        className="rounded-lg border p-2 text-sm sm:text-base" 
                                        value="Revision" 
                                        readOnly 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p>Details of Modification</p>
                                <textarea
                                    rows="5"
                                    name="details"
                                    className="rounded-lg"
                                    required
                                    onChange={(e) => setNotice(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex flex-row justify-end gap-3 mt-5">
                                <PrimaryButton type="submit" onClick={(e) => add_revision_notice(e, data.id)}>Submit Notice</PrimaryButton>
                                <PrimaryButton type="button" onClick={closeAddRevisionNotesModal}>Close</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* Comply Details Modal */}
        {isModal1Open && (
            <div className="fixed z-100 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="relative flex max-h-[90dvh]  w-6/12 flex-col rounded-lg bg-white shadow">
                    <div className="flex items-start justify-between rounded-t border-b p-5">
                        <h3 className="text-xl font-medium text-gray-900">comply notice form</h3>
                    </div>
                    <div className="flex-1 overflow-auto p-6">
                        <form className="flex flex-col gap-3 text-sm">
                            <div className="w-full flex flex-col gap-1">
                                <p>External Url</p>
                                <textarea
                                    rows="5"
                                    name="details"
                                    className="rounded-lg"
                                    required
                                    onChange={(e) => setExternalLink(e.target.value)}
                                ></textarea>
                                <InputError message={errors.externalLink} className="mt-2" />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <p>Details of Modification</p>
                                <textarea
                                    rows="5"
                                    name="details"
                                    className="rounded-lg"
                                    required
                                    onChange={(e) => setModification(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex flex-row justify-end gap-3 mt-5">
                                <PrimaryButton type="submit" onClick={(e) => comply_revision_notice(e, data.id)}>Comply Submit</PrimaryButton>
                                <PrimaryButton type="button" onClick={closeComplyRevisionNotesModal}>Close</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* Approved document form Modal */}
        {isModal2Open && (
            <div className="fixed z-100 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="relative flex max-h-[90dvh]  w-6/12 flex-col rounded-lg bg-white shadow">
                    <div className="flex items-start justify-between rounded-t border-b p-5">
                        <h3 className="text-xl font-medium text-gray-900">Approved document form</h3>
                    </div>
                    <div className="flex-1 max-w-full p-6">
                        <form className="flex flex-col gap-3 text-sm">
                            <div className="w-full flex flex-col gap-1">
                                <p>Approved Url</p>
                                <textarea
                                    rows="5"
                                    name="details"
                                    className="rounded-lg"
                                    required
                                    onChange={(e) => setApproveLink(e.target.value)}
                                ></textarea>
                                  <InputError message={errors.approveLink} className="mt-2" />
                            </div>
                            <div className="flex flex-row justify-end gap-3 mt-5">
                                <PrimaryButton type="submit" onClick={(e) => approve_document(e, data.id)}>Approve</PrimaryButton>
                                <PrimaryButton type="button" onClick={closeApproveLinkModal}>Close</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* Archive Petition Form Modal */}
        {isModal3Open && (
            <div className="fixed z-100 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="relative flex max-h-[90dvh]  w-6/12 flex-col rounded-lg bg-white shadow">
                    <div className="flex items-start justify-between rounded-t border-b p-5">
                        <h3 className="text-xl font-medium text-gray-900">Archive Petition Form</h3>
                    </div>
                    <div className="flex-1 overflow-auto p-6">
                        <form className="flex flex-col gap-3 text-sm">
                            <div className="w-full flex flex-col gap-1">
                                <p>Archive Petition Reason</p>
                                <textarea
                                    rows="5"
                                    name="details"
                                    className="rounded-lg"
                                    required
                                    onChange={(e) => setReason(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex flex-row justify-end gap-3 mt-5">
                                <PrimaryButton type="submit" onClick={(e) => petition_archive(e, data.id)}>Submit</PrimaryButton>
                                <PrimaryButton type="button" onClick={closeArchivePetitionModal}>Close</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* Accept Archive Form Modal */}
        {isModal4Open && (
            <div className="fixed z-100 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="relative flex max-h-[90dvh]  w-6/12 flex-col rounded-lg bg-white shadow">
                    <div className="flex items-start justify-between rounded-t border-b p-5">
                        <h3 className="text-xl font-medium text-gray-900">Approved archive petition form</h3>
                    </div>
                    <div className="flex-1 overflow-auto p-6">
                        <form className="flex flex-col gap-3 text-sm">
                            <div className="w-full flex flex-col gap-1">
                                <p>Archive Url</p>
                                <textarea
                                    rows="5"
                                    name="details"
                                    className="rounded-lg"
                                    required
                                    onChange={(e) => setArchiveLink(e.target.value)}
                                ></textarea>
                                <InputError message={errors.archiveLink} className="mt-2" />
                            </div>
                            <div className="flex flex-row justify-end gap-3 mt-5">
                                <PrimaryButton type="submit" onClick={(e) => archive_document(e, data.id)}>Submit</PrimaryButton>
                                <PrimaryButton type="button" onClick={closeAcceptArchivePetitionModal}>Close</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* Reject Archive Form Modal */}
        {isModal5Open && (
            <div className="fixed z-100 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="relative flex max-h-[90dvh]  w-6/12 flex-col rounded-lg bg-white shadow">
                    <div className="flex items-start justify-between rounded-t border-b p-5">
                        <h3 className="text-xl font-medium text-gray-900">Archive Rejection Form</h3>
                    </div>
                    <div className="flex-1 overflow-auto  p-6">
                        <form className="flex flex-col gap-3 text-sm">
                            <div className="w-full flex flex-col gap-1">
                                <p>Reason of Rejection:</p>
                                <textarea
                                    rows="5"
                                    name="details"
                                    className="rounded-lg"
                                    required
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex flex-row justify-end gap-3 mt-5">
                                <PrimaryButton type="submit" onClick={(e) => reject_archive_document(e, data.id)}>Submit</PrimaryButton>
                                <PrimaryButton type="button" onClick={closeRejectArchiveForm}>Close</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* Revision Form */}
        {isModal6Open && (
            <div className="fixed z-100 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="relative flex max-h-[90dvh]  w-6/12 flex-col rounded-lg bg-white shadow">
                    <div className="flex items-start justify-between rounded-t border-b p-5">
                        <h3 className="text-xl font-medium text-gray-900">Revision Form</h3>
                    </div>
                    <div className="flex-1 overflow-auto p-6">
                        <form className="flex flex-col gap-3 text-sm">
                            <div className="w-full flex flex-col gap-1">
                                <p>Url</p>
                                <textarea
                                    rows="5"
                                    name="details"
                                    className="rounded-lg"
                                    required
                                    onChange={(e) => setRevisionLink(e.target.value)}
                                ></textarea>
                                <InputError message={errors.revisionLink} className="mt-2" />
                                   <p>Originator Notes</p>
                                <textarea
                                    rows="5"
                                    name="details"
                                    className="rounded-lg"
                                    required
                                    onChange={(e) => setOriginatorNotes(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="flex flex-row justify-end gap-3 mt-5">
                                <PrimaryButton type="submit" onClick={(e) => add_document_revision(e, data.id)}>Submit</PrimaryButton>
                                <PrimaryButton type="button" onClick={closeAddRevisionModal}>Close</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}
