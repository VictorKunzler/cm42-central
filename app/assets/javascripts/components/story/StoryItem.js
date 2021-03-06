import React from 'react';
import PropTypes from 'prop-types';
import CollapsedStory from './CollapsedStory';
import ExpandedStory from './ExpandedStory';
import { connect } from 'react-redux';
import { toggleStory } from '../../actions/story';
import { releaseIsLate } from '../../models/beta/story';

export const StoryItem = ({ story, toggleStory }) => {
  const className = releaseIsLate(story) ? 'Story--late-release' : '';
  const title = releaseIsLate(story) ? I18n.t('story.warnings.backlogged_release') : '';

  return (
    <div className='story-container'>
      {
        story.collapsed
          ? <CollapsedStory
            story={story}
            onToggle={() => toggleStory(story.id)}
            className={className}
            title={title}
          />
          : <ExpandedStory
            story={story}
            onToggle={() => toggleStory(story.id)}
            className={className}
            title={title}
          />
      }
    </div>
  );
};

StoryItem.propTypes = {
  story: PropTypes.object.isRequired,
  toggleStory: PropTypes.func.isRequired
};

export default connect(
  null,
  { toggleStory }
)(StoryItem);
