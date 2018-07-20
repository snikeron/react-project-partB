/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const suggestions = [
  { label: '.NET Core' },
  { label: '.NET Framework' },
  { label: 'ActionScript' },
  { label: 'Amazon DynamoDB' },
  { label: 'Amazon RDS/Aurora' },
  { label: 'Angular' },
  { label: 'Apache HBase' },
  { label: 'Apache Hive' },
  { label: 'ASP.NET' },
  { label: 'ASP.NET Core' },
  { label: 'Assembly' },
  { label: 'AWS' },
  { label: 'Bash/Shell' },
  { label: 'C' },
  { label: 'C#' },
  { label: 'C++' },
  { label: 'Cassandra' },
  { label: 'Clojure' },
  { label: 'CodeIgniter' },
  { label: 'CoffeeScript' },
  { label: 'Common Lisp' },
  { label: 'Cordova' },
  { label: 'CSS' },
  { label: 'Dart' },
  { label: 'Django' },
  { label: 'Drupal' },
  { label: 'Elasticsearch' },
  { label: 'Electron' },
  { label: 'Elixir' },
  { label: 'Ember.js' },
  { label: 'Erlang' },
  { label: 'Express' },
  { label: 'F#' },
  { label: 'Firebase' },
  { label: 'Flask' },
  { label: 'Go' },
  { label: 'Google Cloud' },
  { label: 'Groovy' },
  { label: 'Hadoop' },
  { label: 'Haskell' },
  { label: 'HTML' },
  { label: 'IBM Db2' },
  { label: 'Java' },
  { label: 'JavaScript' },
  { label: 'Julia' },
  { label: 'Koa' },
  { label: 'Kotlin' },
  { label: 'Lua' },
  { label: 'MariaDB' },
  { label: 'Matlab' },
  { label: 'Memcached' },
  { label: 'Meteor' },
  { label: 'Microsoft Azure' },
  { label: 'MongoDB' },
  { label: 'MySQL' },
  { label: 'Neo4j' },
  { label: 'Node.js' },
  { label: 'Objective-C' },
  { label: 'Oracle' },
  { label: 'Perl' },
  { label: 'Phalcon' },
  { label: 'PHP' },
  { label: 'PostgreSQL' },
  { label: 'Python' },
  { label: 'R' },
  { label: 'React' },
  { label: 'Redis' },
  { label: 'Ruby' },
  { label: 'Ruby on Rails' },
  { label: 'Rust' },
  { label: 'Scala' },
  { label: 'Sinatra' },
  { label: 'Smalltalk' },
  { label: 'Spark' },
  { label: 'Spring' },
  { label: 'SQL' },
  { label: 'SQL Server' },
  { label: 'SQLite' },
  { label: 'Swift' },
  { label: 'Symfony' },
  { label: 'TensorFlow' },
  { label: 'Torch/PyTorch' },
  { label: 'TypeScript' },
  { label: 'VB.NET' },
  { label: 'VBA' },
  { label: 'Visual Basic 6' },
  { label: 'Vue.js' },
  { label: 'WordPress' },
  { label: 'Xamarin' },
  { label: 'Yii' },
  { label: 'Zend' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

class IntegrationReactSelect extends React.Component {
  state = {
    techStack: null,
  };

  handleChange = name => value => {
    this.setState({
      [name]: value,
    });
    this.props.raiseData(value)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        
        <TextField
          fullWidth
          value={this.state.techStack}
          onChange={this.handleChange('techStack')}
          placeholder="Select Technologies"
          name="react-select-chip-label"
          label="With label"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: SelectWrapped,
            inputProps: {
              classes,
              multi: true,
              instanceId: 'react-select-chip-label',
              id: 'react-select-chip-label',
              simpleValue: true,
              options: suggestions,
            },
          }}
        />
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationReactSelect);
