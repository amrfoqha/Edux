import React, {useEffect, useState} from 'react';
import ChatHeader from "@/Components/chat/ChatHeader.jsx";
import SearchInput from "@/Components/shared/SearchInput.jsx";
import {Button} from "@/Components/ui/Button.jsx";
import {motion} from "motion/react";
import {useNavigate} from "react-router-dom";
import RoomsGrid from "@/Components/chat/room/RoomsGrid.jsx";
import RoomsEmptyState from "@/Components/chat/room/RoomsEmptyState.jsx";
import {getAllRooms} from "@/API/RoomApi.jsx";

const RoomsPage = () => {
    const categories = ["All", "Study Group", "Lab Group", "Development"]
    const [selected, setSelected] = useState("")
    const onNavigate = useNavigate()
    const [rooms, setRooms] = useState([])
    const [search, setSearch] = useState("")

    // const filteredRooms = (rooms ?? []).filter((room) => {
    //     const name = room?.name?.toLowerCase?.() ?? "";
    //     const description = room?.description?.toLowerCase?.() ?? "";
    //     const query = search?.toLowerCase?.() ?? "";
    //
    //     const matchesSearch =
    //         name.includes(query) || description.includes(query);
    //
    //     const matchesCategory =
    //         !selected || selected === "All" || room?.category === selected;
    //
    //     return matchesSearch && matchesCategory;
    // });


    useEffect(() => {
        async function getRooms() {
            try {
                const res = await getAllRooms();
                setRooms(res);
            } catch (e) {
                console.log(e)
            }
        }

        getRooms()
    }, []);

    return (
        <div>
            <div
                className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-10">
                    <ChatHeader room={true} subText={"Join study groups and collaborate with fellow students"}
                                text={"Chat Rooms"}
                                routeText={"Create Room"} route={"/add-room"} onNavigate={onNavigate}/>
                </div>
                <div className="flex gap-5 mt-5">
                    <SearchInput onChange={setSearch} placeholder="Search..." value={search}/>
                    {categories.map((category) => (
                        <motion.div key={category} whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                            <Button
                                variant={selected === category || (category === 'All' && !selected) ? 'default' : 'outline'}
                                onClick={() => setSelected(category === 'All' ? null : category)}
                                className="whitespace-nowrap hover:bg-primary hover:text-white"
                            >
                                {category}
                            </Button>
                        </motion.div>
                    ))}
                </div>
                <div className={"mt-8"}>
                    {rooms?.length ? <RoomsGrid rooms={rooms}/> : <RoomsEmptyState/>}
                </div>

            </div>
        </div>
    );
};

export default RoomsPage;