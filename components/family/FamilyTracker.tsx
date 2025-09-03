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
            <FamilyMembersCard 
                now={now} 
                family={family}
                addMember={addMember}
                updateMember={updateMember}
                deleteMember={deleteMember}
                exportFamily={exportFamily}
                importFamily={importFamily}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AgeGapCard family={family} />
                <StatisticsCard now={now} family={family} />
            </div>
            <SiblingGapsCard family={family} />
            <GenerationsCard family={family} />
            <MilestonesCard now={now} family={family} />
            <InstructionsCard
                title="How to Use the Family Tracker"
                steps={[
                    "Use the action buttons in the 'Family Members' card to 'Add' or 'Import' your relatives.",
                    "Fill in each member's details, including their name, relation to you, and date of birth.",
                    "Once members are added, the cards below will automatically populate with live-updating data.",
                    "Explore statistics, compare age gaps between members, visualize generations, and track milestones."
                ]}
            />
        </div>
    );
};

export default FamilyTracker;