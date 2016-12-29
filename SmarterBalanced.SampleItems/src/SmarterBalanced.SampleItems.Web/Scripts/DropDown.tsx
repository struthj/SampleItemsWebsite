interface Selection {
    disabled: boolean;
    selected: boolean;
    label: string;
    code: string;
}

interface DropdownProps {
    defaultSelection: string;
    label: string;
    selections: Selection[];
    updateSelection(code: string, label: string): void;
}

interface DropdownState {
}

class DropDown extends React.Component<DropdownProps, DropdownState> {
    constructor(props: DropdownProps) {
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
    }

    onChange(event: any): void {
        console.log("I got a selection!");
        console.log(event.target.value);
        this.props.updateSelection(event.target.value, this.props.label);
    }

    renderOption(selection: Selection) {
        return (
            <option value={selection.code}
                disabled={selection.disabled}
                key={selection.label}>

                {selection.label}
            </option>
        );
    }

    render() {
        const options = this.props.selections.map(this.renderOption);
        return (
            <div className="accessibility-dropdown form-group">
                <label>{this.props.label}</label><br/>
                <select className="form-control"
                    onChange={this.onChange}>
                    {options}
                </select>
            </div>
        );
    }
}