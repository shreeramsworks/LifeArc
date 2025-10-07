import React, { useState, useRef, useMemo } from 'react';
import Card from './Card';
import { FamilyMember } from '../../types';
import { calculateAgeDuration } from '../../lib/familyCalculations';
import { RELATIONS } from '../../constants';

interface FamilyMembersCardProps {
    now: Date;
    family: FamilyMember[];
    addMember: (member: Omit<FamilyMember, 'id'>) => void;
    updateMember: (member: FamilyMember) => void;
    deleteMember: (id: string) => void;
    exportFamily: () => void;
    importFamily: (file: File) => void;
}

const AddMemberModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (member: Omit<FamilyMember, 'id'> | FamilyMember) => void;
    member: Omit<FamilyMember, 'id'> | FamilyMember | null;
    existingNames: string[];
}> = ({ isOpen, onClose, onSave, member, existingNames }) => {
    const [name, setName] = useState('');
    const [relation, setRelation] = useState(RELATIONS[0]);
    const [customRelation, setCustomRelation] = useState('');
    const [dob, setDob] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');

    React.useEffect(() => {
        setError('');
        if (member) {
            setName(member.name);
            const isStandardRelation = RELATIONS.includes(member.relation);
            if (isStandardRelation) {
                setRelation(member.relation);
                setCustomRelation('');
            } else {
                setRelation('Other');
                setCustomRelation(member.relation);
            }
            const date = new Date(member.dobISO);
            // Defensive check for invalid dates from localStorage
            if (!isNaN(date.getTime())) {
                setDob(date.toISOString().split('T')[0]);
                setTime(date.toTimeString().split(' ')[0].substring(0, 5));
            } else {
                setDob('');
                setTime('');
                console.error('Invalid date format encountered for member:', member);
                setError('Could not read the stored date for this member. Please set it again.');
            }
        } else {
            setName('');
            setRelation(RELATIONS[0]);
            setCustomRelation('');
            setDob('');
            setTime('');
        }
    }, [member, isOpen]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const otherNames = member ? existingNames.filter(n => n.toLowerCase() !== member.name.toLowerCase()) : existingNames;
        if (otherNames.some(n => n.toLowerCase() === name.toLowerCase())) {
            setError('A member with this name already exists.');
            return;
        }

        const finalTime = time || '00:00';
        const timeWithSeconds = finalTime.length === 5 ? `${finalTime}:00` : finalTime;
        const dobISO = `${dob}T${timeWithSeconds}`;

        if (new Date(dobISO) > new Date()) {
            setError('Date of birth cannot be in the future.');
            return;
        }

        const finalRelation = relation === 'Other' ? customRelation.trim() : relation;
        if (relation === 'Other' && !finalRelation) {
            setError('Please specify the custom relationship.');
            return;
        }

        const memberData = { name, relation: finalRelation, dobISO };
        if (member && 'id' in member) {
            onSave({ ...memberData, id: member.id });
        } else {
            onSave(memberData);
        }
        onClose();
    };

    return (
        <div 
            className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-end sm:items-center z-50 p-0 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
            onClick={onClose}
        >
            <div 
                className={`bg-gray-800 text-gray-200 border-t-2 border-blue-500 rounded-t-lg sm:rounded-lg p-6 sm:p-8 w-full max-w-md transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full sm:translate-y-0'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-4">{member ? 'Edit Member' : 'Add Member'}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    {error && <p className="text-red-400 text-sm bg-red-900/50 p-3 rounded-md">{error}</p>}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="w-full mt-1 p-2 bg-gray-900 border border-gray-600 rounded-md"/>
                    </div>
                    <div>
                        <label htmlFor="relation" className="block text-sm font-medium text-gray-300">Relation</label>
                        <select id="relation" value={relation} onChange={e => setRelation(e.target.value)} className="w-full mt-1 p-2 bg-gray-900 border border-gray-600 rounded-md">
                            {RELATIONS.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                    </div>
                    {relation === 'Other' && (
                         <div>
                            <label htmlFor="custom_relation" className="block text-sm font-medium text-gray-300">Custom Relation</label>
                            <input type="text" id="custom_relation" value={customRelation} onChange={e => setCustomRelation(e.target.value)} required placeholder="e.g., Godparent" className="w-full mt-1 p-2 bg-gray-900 border border-gray-600 rounded-md placeholder:text-gray-400"/>
                        </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-300">Date of Birth</label>
                            <input type="date" id="dob" value={dob} onChange={e => setDob(e.target.value)} required className="w-full mt-1 p-2 bg-gray-900 border border-gray-600 rounded-md"/>
                        </div>
                        <div>
                            <label htmlFor="time" className="block text-sm font-medium text-gray-300">Birth Time (optional)</label>
                            <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} className="w-full mt-1 p-2 bg-gray-900 border border-gray-600 rounded-md"/>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600">Cancel</button>
                        <button type="submit" className="py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const LiveAge: React.FC<{ dobISO: string, now: Date }> = ({ dobISO, now }) => {
    const ageString = useMemo(() => {
        const age = calculateAgeDuration(dobISO, now);
        return `${age.years}y ${age.months}m ${age.days}d ${age.hours}h ${age.minutes}m ${age.seconds}s`;
    }, [dobISO, now]);

    return <span className="font-mono text-sm sm:text-base text-gray-300">{ageString}</span>;
};

const FamilyMembersCard: React.FC<FamilyMembersCardProps> = ({ now, family, addMember, updateMember, deleteMember, exportFamily, importFamily }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
    const importInputRef = useRef<HTMLInputElement>(null);

    const handleAddClick = () => {
        setEditingMember(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (member: FamilyMember) => {
        setEditingMember(member);
        setIsModalOpen(true);
    };
    
    const handleSave = (memberData: Omit<FamilyMember, 'id'> | FamilyMember) => {
        if ('id' in memberData) {
            updateMember(memberData);
        } else {
            addMember(memberData);
        }
    };

    const handleImportClick = () => {
        importInputRef.current?.click();
    };

    const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            importFamily(e.target.files[0]);
            e.target.value = ''; // Reset file input
        }
    };

    const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
    const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
    const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
    const ExportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
    const ImportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;

    return (
        <>
            <Card
                title="Family Members"
                actions={
                    <div className="flex items-center gap-2">
                        <button onClick={handleImportClick} className="bg-white/10 hover:bg-white/20 text-white font-bold p-2 rounded-full inline-flex items-center justify-center transition-colors" style={{ width: '44px', height: '44px' }} aria-label="Import Family Data">
                            <ImportIcon />
                        </button>
                        <input type="file" ref={importInputRef} onChange={handleFileImport} accept=".json" className="hidden" />
                        <button onClick={exportFamily} className="bg-white/10 hover:bg-white/20 text-white font-bold p-2 rounded-full inline-flex items-center justify-center transition-colors" style={{ width: '44px', height: '44px' }} aria-label="Export Family Data">
                            <ExportIcon />
                        </button>
                        <button onClick={handleAddClick} className="bg-white/10 hover:bg-white/20 text-white font-bold p-2 rounded-full inline-flex items-center justify-center transition-colors" style={{ width: '44px', height: '44px' }} aria-label="Add Family Member">
                            <AddIcon />
                        </button>
                    </div>
                }
            >
                {family.length > 0 ? (
                    <ul className="space-y-3">
                        {family.map(member => (
                            <li key={member.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-gray-900 rounded-lg border border-gray-700">
                                <div className="mb-2 sm:mb-0">
                                    <p className="font-bold text-gray-200">{member.name}</p>
                                    <p className="text-sm text-gray-300">{member.relation}</p>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <LiveAge dobISO={member.dobISO} now={now} />
                                    <button onClick={() => handleEditClick(member)} className="text-gray-400 hover:text-blue-400 p-2" style={{ minWidth: '44px', minHeight: '44px' }} aria-label={`Edit ${member.name}`}><EditIcon /></button>
                                    <button onClick={() => deleteMember(member.id)} className="text-gray-400 hover:text-red-500 p-2" style={{ minWidth: '44px', minHeight: '44px' }} aria-label={`Delete ${member.name}`}><DeleteIcon /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <p>No family members yet.</p>
                        <p>Click the action buttons to add or import members!</p>
                    </div>
                )}
            </Card>
            <AddMemberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                member={editingMember}
                existingNames={family.map(m => m.name)}
            />
        </>
    );
};

export default FamilyMembersCard;