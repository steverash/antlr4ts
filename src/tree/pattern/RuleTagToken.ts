/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */

// ConvertTo-TS run at 2016-10-04T11:26:46.0343500-07:00

import { CharStream } from '../../CharStream';
import { NotNull, Override } from '../../Decorators';
import { Token } from '../../Token';
import { TokenSource } from '../../TokenSource';

/**
 * A {@link Token} object representing an entire subtree matched by a parser
 * rule; e.g., {@code <expr>}. These tokens are created for {@link TagChunk}
 * chunks where the tag corresponds to a parser rule.
 */
export class RuleTagToken implements Token {
	/**
	 * This is the backing field for `ruleName`.
	 */
	private _ruleName: string;
	/**
	 * The token type for the current token. This is the token type assigned to
	 * the bypass alternative for the rule during ATN deserialization.
	 */
	private bypassTokenType: number;
	/**
	 * This is the backing field for `label`.
	 */
	private _label?: string;

	/**
	 * Constructs a new instance of {@link RuleTagToken} with the specified rule
	 * name, bypass token type, and label.
	 *
	 * @param ruleName The name of the parser rule this rule tag matches.
	 * @param bypassTokenType The bypass token type assigned to the parser rule.
	 * @param label The label associated with the rule tag, or {@code null} if
	 * the rule tag is unlabeled.
	 *
	 * @exception IllegalArgumentException if {@code ruleName} is {@code null}
	 * or empty.
	 */
	constructor(@NotNull ruleName: string, bypassTokenType: number, label?: string) {
		if (ruleName == null || ruleName.length === 0) {
			throw new Error("ruleName cannot be null or empty.");
		}

		this._ruleName = ruleName;
		this.bypassTokenType = bypassTokenType;
		this._label = label;
	}

	/**
	 * Gets the name of the rule associated with this rule tag.
	 *
	 * @return The name of the parser rule associated with this rule tag.
	 */
	@NotNull
	get ruleName(): string {
		return this._ruleName;
	}

	/**
	 * Gets the label associated with the rule tag.
	 *
	 * @return The name of the label associated with the rule tag, or
	 * {@code null} if this is an unlabeled rule tag.
	 */
	get label(): string | undefined {
		return this._label;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>Rule tag tokens are always placed on the {@link #DEFAULT_CHANNEL}.</p>
	 */
	@Override
	get channel(): number {
		return Token.DEFAULT_CHANNEL;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>This method returns the rule tag formatted with {@code <} and {@code >}
	 * delimiters.</p>
	 */
	@Override
	get text(): string {
		if (this._label != null) {
			return "<" + this._label + ":" + this._ruleName + ">";
		}

		return "<" + this._ruleName + ">";
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>Rule tag tokens have types assigned according to the rule bypass
	 * transitions created during ATN deserialization.</p>
	 */
	@Override
	get type(): number {
		return this.bypassTokenType;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>The implementation for {@link RuleTagToken} always returns 0.</p>
	 */
	@Override
	get line(): number {
		return 0;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>The implementation for {@link RuleTagToken} always returns -1.</p>
	 */
	@Override
	get charPositionInLine(): number {
		return -1;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>The implementation for {@link RuleTagToken} always returns -1.</p>
	 */
	@Override
	get tokenIndex(): number {
		return -1;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>The implementation for {@link RuleTagToken} always returns -1.</p>
	 */
	@Override
	get startIndex(): number {
		return -1;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>The implementation for {@link RuleTagToken} always returns -1.</p>
	 */
	@Override
	get stopIndex(): number {
		return -1;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>The implementation for {@link RuleTagToken} always returns {@code null}.</p>
	 */
	@Override
	get tokenSource(): TokenSource | undefined {
		return undefined;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>The implementation for {@link RuleTagToken} always returns {@code null}.</p>
	 */
	@Override
	get inputStream(): CharStream | undefined {
		return undefined;
	}

	/**
	 * {@inheritDoc}
	 *
	 * <p>The implementation for {@link RuleTagToken} returns a string of the form
	 * {@code ruleName:bypassTokenType}.</p>
	 */
	@Override
	toString(): string {
		return this._ruleName + ":" + this.bypassTokenType;
	}
}
