import { DiscussionEmbed } from 'disqus-react';

const Disqus = ({ post }) => {
    const shortName = "disqus_8RPT4iKIjZ";
    const config = {
        url: `https://bhar4t/articles/${post.id}`,
        identifier: post.id,
        title: post.title
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