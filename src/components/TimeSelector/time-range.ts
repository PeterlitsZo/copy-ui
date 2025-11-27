type TimeRange = {
  from: TimeValue;
  to: TimeValue;
  tz: number;
};

type ParsedTimeRange = {
  from: ParsedTimeValue;
  to: ParsedTimeValue;
  tz: number;
};

type ParsedTimeRangeResult =
  | { ok: true; value: ParsedTimeRange }
  | { ok: false; error: string };

function safeParseTimeRange(range: TimeRange): ParsedTimeRangeResult {
  const fromResult = safeParseTimeValue(range.from);
  const toResult = safeParseTimeValue(range.to);
  if (!fromResult.ok || !toResult.ok) {
    return { ok: false, error: "Invalid time range" };
  }
  return {
    ok: true,
    value: { from: fromResult.value, to: toResult.value, tz: range.tz },
  };
}

type ResolvedTimeRange = {
  from: Date;
  to: Date;
};

type ResolvedTimeRangeResult =
  | { ok: true; value: ResolvedTimeRange }
  | { ok: false; error: string };

function safeResolveTimeRange(range: TimeRange): ResolvedTimeRangeResult {
  const fromResult = safeParseTimeValue(range.from);
  const toResult = safeParseTimeValue(range.to);
  if (!fromResult.ok || !toResult.ok) {
    return { ok: false, error: "Invalid time range" };
  }

  const from = fromResult.value;
  const to = toResult.value;

  try {
    return {
      ok: true,
      value: {
        from: resolveParsedTimeValue(from, range.tz),
        to: resolveParsedTimeValue(to, range.tz),
      },
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

function resolveParsedTimeValue(value: ParsedTimeValue, tz: number): Date {
  const result = resolveParsedTimeValueExpr(value.expr, tz);
  if (result.t === "date") {
    return result.value;
  }
  throw new Error(`Unexpected result`);
}

function resolveDuration(amount: number, unit: "m" | "h" | "d" | "y"): number {
  switch (unit) {
    case "m":
      return amount * 60 * 1000;
    case "h":
      return amount * 60 * 60 * 1000;
    case "d":
      return amount * 24 * 60 * 60 * 1000;
    case "y":
      return amount * 365 * 24 * 60 * 60 * 1000;
  }
}

function resolveParsedTimeValueExpr(
  expr: ParsedTimeValueExpr,
  tz: number,
):
  | { t: "date"; value: Date }
  | { t: "duration"; amount: number; unit: "m" | "h" | "d" | "y" } {
  if (expr.t === "atom") {
    return resolveParsedTimeValueAtom(expr.atom, tz);
  }
  if (expr.t === "add") {
    const left = resolveParsedTimeValueExpr(expr.left, tz);
    const right = resolveParsedTimeValueExpr(expr.right, tz);

    if (left.t !== "date") {
      throw new Error(`Left operand is not a date: ${left.t}`);
    }
    if (right.t !== "duration") {
      throw new Error(`Right operand is not a duration: ${right.t}`);
    }

    return {
      t: "date",
      value: new Date(
        left.value.getTime() + resolveDuration(right.amount, right.unit),
      ),
    };
  }
  if (expr.t === "sub") {
    const left = resolveParsedTimeValueExpr(expr.left, tz);
    const right = resolveParsedTimeValueExpr(expr.right, tz);

    if (left.t !== "date") {
      throw new Error(`Left operand is not a date: ${left.t}`);
    }
    if (right.t !== "duration") {
      throw new Error(`Right operand is not a duration: ${right.t}`);
    }

    return {
      t: "date",
      value: new Date(
        left.value.getTime() - resolveDuration(right.amount, right.unit),
      ),
    };
  }

  throw new Error(`Unexpected expression`);
}

function resolveParsedTimeValueAtom(
  atom: ParsedTimeValueAtom,
  tz: number,
):
  | { t: "date"; value: Date }
  | { t: "duration"; amount: number; unit: "m" | "h" | "d" | "y" } {
  if (atom.t === "now") {
    return { t: "date", value: new Date() };
  }
  if (atom.t === "duration") {
    return { t: "duration", amount: atom.amount, unit: atom.unit };
  }
  if (atom.t === "datetime") {
    const date = Date.UTC(
      atom.value.year,
      atom.value.month - 1,
      atom.value.day,
      atom.value.hour,
      atom.value.minute,
      atom.value.second,
    );
    const dateWithTz = new Date(date - tz * 60 * 60 * 1000);
    return { t: "date", value: dateWithTz };
  }
  throw new Error(`Unexpected atom`);
}

type TimeValue = {
  t: "_time_value";
  v: string;
};

type ParsedTimeValue = {
  expr: ParsedTimeValueExpr;
};

type ParsedTimeValueExpr =
  | { t: "atom"; atom: ParsedTimeValueAtom }
  | { t: "add"; left: ParsedTimeValueExpr; right: ParsedTimeValueExpr }
  | { t: "sub"; left: ParsedTimeValueExpr; right: ParsedTimeValueExpr };

type ParsedTimeValueAtom =
  | { t: "now" }
  | { t: "duration"; amount: number; unit: "m" | "h" | "d" | "y" }
  | {
      t: "datetime";
      value: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
      };
    };

type ParsedTimeValueResult =
  | { ok: true; value: ParsedTimeValue }
  | { ok: false; error: string };

function safeParseTimeValue(value: TimeValue): ParsedTimeValueResult {
  const str = value.v.trim();

  try {
    const expr = parseTimeExpression(str);
    return { ok: true, value: { expr } };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

type Token =
  | { type: "NOW"; value: "now" }
  | { type: "NUMBER"; value: number }
  | { type: "UNIT"; value: "m" | "h" | "d" | "y" }
  | { type: "OPERATOR"; value: "+" | "-" }
  | {
      type: "DATETIME";
      value: {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
      };
    };

// Tokenizer: Convert string to token stream.
function tokenize(str: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < str.length) {
    const char = str[i];

    // Skip whitespace.
    if (/\s/.test(char)) {
      while (i < str.length && /\s/.test(str[i])) {
        i++;
      }
      continue;
    }

    // Parse "now".
    if (str.slice(i).startsWith("now")) {
      tokens.push({ type: "NOW", value: "now" });
      i += 3;
      continue;
    }

    // Parse datetime first (before numbers to avoid conflicts).
    //
    // Try standard datetime format: "2025-01-01 12:00:00".
    const remaining = str.slice(i);
    const datetimeMatch = remaining.match(
      /^\d{4}-\d{2}-\d{2}(?:\s+\d{2}:\d{2}(?::\d{2})?)?/,
    );
    if (datetimeMatch) {
      const [year, month, day, hour, minute, second] = datetimeMatch[0]
        .split(/[- :]/)
        .map(Number);
      tokens.push({
        type: "DATETIME",
        value: { year, month, day, hour, minute, second },
      });
      i += datetimeMatch[0].length;
      continue;
    }

    // Parse operators.
    if (char === "+" || char === "-") {
      tokens.push({ type: "OPERATOR", value: char });
      i++;
      continue;
    }

    // Parse numbers.
    if (/\d/.test(char)) {
      let numberStr = "";
      while (i < str.length && /\d/.test(str[i])) {
        numberStr += str[i];
        i++;
      }
      const number = Number.parseInt(numberStr, 10);
      if (Number.isNaN(number)) {
        throw new Error(`Invalid number: ${numberStr}`);
      }
      tokens.push({ type: "NUMBER", value: number });
      continue;
    }

    // Parse units (m, h, d, y).
    if (/[mhdy]/.test(char)) {
      const unit = char as "m" | "h" | "d" | "y";
      tokens.push({ type: "UNIT", value: unit });
      i++;
      continue;
    }

    throw new Error(`Unexpected character: "${char}" at position ${i}`);
  }

  return tokens;
}

// Parser: Convert token stream to AST.
function parseTimeExpression(str: string): ParsedTimeValueExpr {
  const tokens = tokenize(str.trim());

  if (tokens.length === 0) {
    throw new Error("Empty expression");
  }

  let index = 0;

  function parseExpression(): ParsedTimeValueExpr {
    return parseAdditiveExpression();
  }

  function parseAdditiveExpression(): ParsedTimeValueExpr {
    let left = parseAtom();

    while (index < tokens.length && tokens[index]?.type === "OPERATOR") {
      const operator = tokens[index] as Token & {
        type: "OPERATOR";
      };
      index++;

      const right = parseAtom();

      if (operator.value === "+") {
        left = { t: "add", left, right };
      } else {
        left = { t: "sub", left, right };
      }
    }

    return left;
  }

  function parseAtom(): ParsedTimeValueExpr {
    if (index >= tokens.length) {
      throw new Error("Unexpected end of expression");
    }

    const token = tokens[index];

    // Parse "now".
    if (token?.type === "NOW") {
      index++;
      return { t: "atom", atom: { t: "now" } };
    }

    // Parse datetime.
    if (token?.type === "DATETIME") {
      index++;
      return {
        t: "atom",
        atom: { t: "datetime", value: token.value },
      };
    }

    // Parse duration: NUMBER UNIT.
    if (token?.type === "NUMBER") {
      const numberToken = token;
      index++;

      if (index >= tokens.length) {
        throw new Error("Expected unit after number");
      }

      const unitToken = tokens[index];
      if (unitToken?.type !== "UNIT") {
        throw new Error(`Expected unit, got ${unitToken?.type}`);
      }

      index++;

      const amount = numberToken.value;
      if (amount <= 0) {
        throw new Error(`Invalid duration amount: ${amount}`);
      }

      return {
        t: "atom",
        atom: {
          t: "duration",
          amount,
          unit: unitToken.value,
        },
      };
    }

    throw new Error(`Unexpected token: ${token?.type}`);
  }

  const result = parseExpression();

  if (index < tokens.length) {
    throw new Error(`Unexpected token at end: ${tokens[index]?.type}`);
  }

  return result;
}

export type {
  TimeRange,
  TimeValue,
  ParsedTimeValue,
  ParsedTimeValueResult,
  ResolvedTimeRange,
  ResolvedTimeRangeResult,
};
export { safeParseTimeRange, safeParseTimeValue, safeResolveTimeRange };
