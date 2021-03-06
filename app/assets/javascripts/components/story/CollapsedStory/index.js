import React from 'react';
import classname from 'classnames';
import StoryPopover from '../StoryPopover';
import StoryDescriptionIcon from '../StoryDescriptionIcon';
import CollapsedStoryEstimate from './CollapsedStoryEstimate';
import CollapsedStoryStateActions from './CollapsedStoryStateActions';
import CollapsedStoryInfo from './CollapsedStoryInfo';
import StoryIcon from '../StoryIcon';
import * as Story from '../../../models/beta/story';
import { updateCollapsedStory } from '../../../actions/story';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const storyClassName = (story, additionalClassname = '') => {
  const isStoryNotEstimated = Story.isStoryNotEstimated(story.storyType, story.estimate);
  const isRelease = Story.isRelease(story);

  return classname(
    'Story Story--collapsed',
    {
      'Story--release': isRelease,
      'Story--unestimated': isStoryNotEstimated,
      'Story--estimated': !isStoryNotEstimated
    },
    additionalClassname
  );
};

export const CollapsedStory = ({ onToggle, story, updateCollapsedStory, project, className, title }) =>
  <div
    className={storyClassName(story, className)}
    onClick={onToggle}
    title={title}
  >
    <StoryPopover story={story}>
      <div className='Story__icons-block'>
        <StoryIcon storyType={story.storyType} />
        <CollapsedStoryEstimate estimate={story.estimate} />
        <StoryDescriptionIcon description={story.description} />
      </div>
    </StoryPopover>

    <CollapsedStoryInfo story={story} />

    <CollapsedStoryStateActions story={story}
      onUpdate={(newAttributes) =>
        updateCollapsedStory(story.id, project.id, newAttributes)}
    />
  </div>

CollapsedStory.propTypes = {
  story: Story.storyPropTypesShape,
  onToggle: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string
};

export default connect(
  ({ project }) => ({ project }),
  { updateCollapsedStory }
)(CollapsedStory);
