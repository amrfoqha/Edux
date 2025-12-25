export default function AuthSwitch({ text, actionText, onClick }) {
    return (
        <p className="text-center text-sm mt-6">
            {text}{" "}
            <button
                onClick={onClick}
                className="text-purple-600 font-semibold hover:underline"
            >
                {actionText}
            </button>
        </p>
    );
}
