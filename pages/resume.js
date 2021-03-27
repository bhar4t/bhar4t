import Layout from "../components/layout";

const styles = {
    height: '84vh'
}

export default function Resume() {
    return (
        <Layout removeSocialLinks removeFooter download>
            <div style={styles}>
                <iframe
                    height="100%"
                    width="100%"
                    title="Bharat Sahu, Resume"
                    src="https://docs.google.com/document/d/e/2PACX-1vQQnllFU0MUxgSf99v2a-VJOc6lsi0HjHoKLls1-aFHsf1pxz9IGmoNEvl6VHSCJmtluuP8OHMG0qXp/pub?embedded=true"
                >
                </iframe>
            </div>
        </Layout>
    )
}