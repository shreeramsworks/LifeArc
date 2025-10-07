import React, { useState, useEffect } from 'react';
import { useFamilyData } from '../../hooks/useFamilyData';
import FamilyMembersCard from './FamilyMembersCard';
import AgeGapCard from './AgeGapCard';
import StatisticsCard from './StatisticsCard';
import SiblingGapsCard from './SiblingGapsCard';
import GenerationsCard from './GenerationsCard';
import MilestonesCard from './MilestonesCard';
import InstructionsCard from '../InstructionsCard';

const FamilyTracker: React.FC = () => {
    const [now, setNow] = useState(new Date());
    const { family, addMember, updateMember, deleteMember, exportFamily, importFamily } = useFamilyData();

    useEffect(() => {
        // This timer is active only when this component is mounted.
        const timerId = setInterval(() => {
            setNow(new Date());
        }, 1000);

        // It's cleaned up automatically on unmount when the user switches tabs.
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="space-y-8">
             <header className="text-center">
                <h1 className="text-4xl sm:text-5xl font-bold text-white">
                    Private Family Tracker - Build Your Family Timeline Securely
                </h1>
                <p className="mt-2 text-lg text-gray-300 max-w-3xl mx-auto">
                   Use our <strong>offline family tree software</strong> to create your <strong>private family timeline</strong>. As a <strong>secure family timeline maker</strong> with no server storage and no account required, it's the perfect <strong>private genealogy software</strong> with a guarantee of <strong>zero data sharing</strong>.
                </p>
            </header>
            <FamilyMembersCard 
                now={now} 
                family={family}
                addMember={addMember}
                updateMember={updateMember}
                deleteMember={deleteMember}
                exportFamily={exportFamily}
                importFamily={importFamily}
            />
             <div className="bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-700 mt-8">
                 <h2 className="text-2xl font-bold text-blue-400 mb-4">Complete Privacy Guarantee</h2>
                 <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li><strong>No Server Storage:</strong> All family data you enter is stored exclusively in your browser's local storage. It never touches our servers.</li>
                    <li><strong>No Account Required:</strong> This is a true <strong>private family tree app with no login</strong> needed. Start building your timeline instantly and anonymously.</li>
                     <li><strong>You Control Your Data:</strong> Export your data to a file at any time, or clear your browser cache to permanently delete it.</li>
                 </ul>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AgeGapCard family={family} />
                <StatisticsCard now={now} family={family} />
            </div>
            <SiblingGapsCard family={family} />
            <GenerationsCard family={family} />
            <MilestonesCard now={now} family={family} />
            <InstructionsCard
                title="How to Use the Private Family Tracker"
                steps={[
                    "Add family members to start your <strong>browser based family tree</strong>. This is a <strong>private family tree app with no login</strong> required.",
                    "All data is saved on your device, providing a true <strong>offline family tree software</strong> experience with <strong>no data sharing</strong>.",
                    "Instantly see <strong>live age tracker</strong> details for your whole family and view <strong>family age statistics</strong>.",
                    "Use the <strong>family age gap calculator</strong> to compare any two members and see the precise time between them.",
                    "Enjoy a completely <strong>anonymous family genealogy tool</strong> that puts your privacy first."
                ]}
            />
        </div>
    );
};

export default FamilyTracker;