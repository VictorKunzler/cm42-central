import React from 'react';
import Clipboard from 'react-clipboard.js';
import { storyUrl } from '../StoryUrl';
import { editingStoryPropTypesShape } from '../../../models/beta/story';

class ExpandedStoryHistoryLocation extends React.Component {
  render() {
    const { story, onClone } = this.props;

    return (
      <div className="col-xs-12 form-group input-group input-group-sm">
        <input
          className="form-control input-sm"
          id={`story-link-${story.id}`}
          readOnly
          value={storyUrl(story)}
        />

        <span className="input-group-btn">
          <Clipboard
            data-clipboard-text={storyUrl(story)}
            component="button"
            className="btn btn-default btn-clipboard"
            button-title={I18n.t('story.events.copy_url')}
          >
            <img src="/clippy.svg" alt={I18n.t('story.events.copy_url')} className="clipboard-icon" />
          </Clipboard>

          <Clipboard
            data-clipboard-text={`#${story.id}`}
            component="button"
            className="btn btn-default btn-clipboard-id btn-clipboard"
            button-title={I18n.t('story.events.copy_id')}
          >
            ID
          </Clipboard>
          <button
            className="btn btn-default clone-story"
            title={I18n.t('story.events.clone')}
            onClick={onClone}
          >
            <i className="mi md-18">content_copy</i>
          </button>
        </span>
      </div>
    );
  };
};

ExpandedStoryHistoryLocation.propTypes = {
  story: editingStoryPropTypesShape.isRequired
};

export default ExpandedStoryHistoryLocation;
