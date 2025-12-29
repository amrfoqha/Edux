import React, {useState} from "react";
import {Hash} from "lucide-react";
import {motion} from "motion/react";
import {Input} from "../../ui/Input.jsx";
import {Button} from "../../ui/Button.jsx";
import FormField from "@/Components/chat/room/FormField.jsx";
import {Textarea} from "@/Components/ui/Textarea.jsx";
import {useNavigate} from "react-router-dom";
import {createRoom} from "@/API/RoomApi.jsx";
import {useAuth} from "@/Hooks/useAuth.jsx";


export default function RoomForm() {
    const [formData, setFormData] = useState({name: "", description: ""});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const {user} = useAuth()

    const container = {
        hidden: {opacity: 0},
        show: {opacity: 1, transition: {staggerChildren: 0.08}},
    };

    const item = {
        hidden: {opacity: 0, y: 16},
        show: {opacity: 1, y: 0},
    };


    const setField = (field, value) => {
        setFormData((prev) => ({...prev, [field]: value}));
        if (errors[field]) setErrors((prev) => ({...prev, [field]: ""}));
    };

    const validate = () => {
        const next = {};
        if (!formData.name.trim()) next.name = "Room name is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setIsSubmitting(true);
            await createRoom({formData,owner: user._id});
            setFormData({name: "", description: ""});
            setErrors({});
            navigate("/rooms");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
                <motion.div variants={item}>
                    <FormField
                        icon={<Hash className="h-4 w-4 text-purple-500"/>}
                        label="Room Name"
                        required
                        error={errors.name}
                    >
                        <Input
                            id="name"
                            placeholder="e.g., Algorithms Study Group"
                            value={formData.name}
                            onChange={(e) => setField("name", e.target.value)}
                            className={`h-12 text-base ${errors.name ? "border-red-500" : ""}`}
                        />
                    </FormField>
                </motion.div>

                <motion.div variants={item}>
                    <FormField label="Description (Optional)">
                        <Textarea
                            id="description"
                            placeholder="Describe what your study room is about..."
                            value={formData.description}
                            onChange={(e) => setField("description", e.target.value)}
                            className="min-h-[120px] text-base resize-none"
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                            Help others understand the purpose of your study room
                        </p>
                    </FormField>
                </motion.div>

                <div className="flex w-full items-center gap-4 mb-5">
                    <motion.div variants={item} className="flex-1">
                        <Button
                            type="reset"
                            size="lg"
                            variant="outline"
                            className="w-full h-12 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-100 shadow-sm text-base"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </Button>
                    </motion.div>

                    <motion.div variants={item} className="flex-1">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg text-base"
                        >
                            {isSubmitting ? "Creating..." : "Create Room"}
                        </Button>
                    </motion.div>

                </div>

            </motion.div>
        </form>
    );
}
