import { DiscussionEmbed } from 'disqus-react';

const Disqus = ({ id, title }) => {
    const shortName = "disqus_8RPT4iKIjZ";
    const config = {
        url: `https://bhar4t/articles/${id}`,
        identifier: id,
        title: title
    }

    return (
        <div>
            <DiscussionEmbed
                shortname={shortName}
                config={config}
            />
        </div>
    )
}

export default Disqus;