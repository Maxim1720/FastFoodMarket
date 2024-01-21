import "./Container.css";

export default function Container({ content }: { content?: JSX.Element | null }) {

    if (!content) {
        return (
            <Content content={
                <div>
                    <svg className="animate-spin" viewBox="0 0 24 24">
                        
                    </svg>
                </div>
            } />

        )
    }

    return (
        <Content content={content} />
    );
}

function Content({ content }: { content: JSX.Element }) {
    return (
        <div
            className="w-full content">
            {content}
        </div >
    );
}

