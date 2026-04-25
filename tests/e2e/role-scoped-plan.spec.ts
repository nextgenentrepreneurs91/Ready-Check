### tests/e2e/role-scoped-plan.spec.ts
```typescript
/**
 * ============================================================
 * FILE: tests/e2e/role-scoped-plan.spec.ts
 * ============================================================
 */

import { test, expect } from '@playwright/test';

test.describe('ReadyCheck Role-Scoped Instruction Flow', () => {

  test('should present distinct, simplified action cards per role', async ({ page, context }) => {

    // 1. DRIVER VIEW
    // Drivers focus on routing, vehicle prep, and safety bypasses.
    await page.goto('/auth/signin');
    await page.fill('input[name="email"]', 'marcus-driver@riverbelt.org');
    await page.click('button[type="submit"]');

    await page.goto('/dashboard/action-card');
    await expect(page.locator('h1')).toContainText('Driver Action Card');
    
    // Core Driver Instruction: Routing
    await expect(page.locator('[data-testid="instruction-list"]')).toContainText('Mandatory Bypass: Highway 41');
    // Ensure they DON'T see Medic-specific technical noise (low overload)
    await expect(page.locator('body')).not.toContainText('Triage-Point B Setup');

    // 2. MEDIC VIEW (Separate session)
    // Medics focus on trauma protocols and distribution points.
    const medicPage = await context.newPage();
    await medicPage.goto('/auth/signin');
    await medicPage.fill('input[name="email"]', 'sara-medic@ngo-core.org');
    await medicPage.click('button[type="submit"]');

    await medicPage.goto('/dashboard/action-card');
    await expect(medicPage.locator('h1')).toContainText('Medic Action Card');
    
    // Core Medic Instruction: Setup
    await expect(medicPage.locator('[data-testid="instruction-list"]')).toContainText('Triage-Point B Setup');
    // Ensure they DON'T see Driver-specific engine/tire check noise (low overload)
    await expect(medicPage.locator('body')).not.toContainText('Tire Pressure Check');

    // 3. READINESS PERSISTENCE
    // Both roles should have their own specific verification gates
    await expect(medicPage.locator('[data-testid="role-verification-gate"]')).toBeVisible();
    await page.bringToFront();
    await expect(page.locator('[data-testid="role-verification-gate"]')).toBeVisible();
  });
});
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### tests/e2e/role-scoped-plan.spec.ts
```typescript
/**
 * ============================================================
 * FILE: tests/e2e/role-scoped-plan.spec.ts
 * ============================================================
 */

import { test, expect } from '@playwright/test';

test.describe('ReadyCheck Role-Scoped Instruction Flow', () => {

  test('should present distinct, simplified action cards per role', async ({ page, context }) => {

    // 1. DRIVER VIEW
    // Drivers focus on routing, vehicle prep, and safety bypasses.
    await page.goto('/auth/signin');
    await page.fill('input[name="email"]', 'marcus-driver@riverbelt.org');
    await page.click('button[type="submit"]');

    await page.goto('/dashboard/action-card');
    await expect(page.locator('h1')).toContainText('Driver Action Card');
    
    // Core Driver Instruction: Routing
    await expect(page.locator('[data-testid="instruction-list"]')).toContainText('Mandatory Bypass: Highway 41');
    // Ensure they DON'T see Medic-specific technical noise (low overload)
    await expect(page.locator('body')).not.toContainText('Triage-Point B Setup');

    // 2. MEDIC VIEW (Separate session)
    // Medics focus on trauma protocols and distribution points.
    const medicPage = await context.newPage();
    await medicPage.goto('/auth/signin');
    await medicPage.fill('input[name="email"]', 'sara-medic@ngo-core.org');
    await medicPage.click('button[type="submit"]');

    await medicPage.goto('/dashboard/action-card');
    await expect(medicPage.locator('h1')).toContainText('Medic Action Card');
    
    // Core Medic Instruction: Setup
    await expect(medicPage.locator('[data-testid="instruction-list"]')).toContainText('Triage-Point B Setup');
    // Ensure they DON'T see Driver-specific engine/tire check noise (low overload)
    await expect(medicPage.locator('body')).not.toContainText('Tire Pressure Check');

    // 3. READINESS PERSISTENCE
    // Both roles should have their own specific verification gates
    await expect(medicPage.locator('[data-testid="role-verification-gate"]')).toBeVisible();
    await page.bringToFront();
    await expect(page.locator('[data-testid="role-verification-gate"]')).toBeVisible();
  });
});
```_
细化了对 `READYCHECK` 这一特定垂直领域的逻辑处理。### tests/e2e/role-scoped-plan.spec.ts
```typescript
/**
 * ============================================================
 * FILE: tests/e2e/role-scoped-plan.spec.ts
 * ============================================================
 */

import { test, expect } from '@playwright/test';

test.describe('ReadyCheck Role-Scoped Instruction Flow', () => {

  test('should present distinct, simplified action cards per role', async ({ page, context }) => {

    // 1. DRIVER VIEW
    // Drivers focus on routing, vehicle prep, and safety bypasses.
    await page.goto('/auth/signin');
    await page.fill('input[name="email"]', 'marcus-driver@riverbelt.org');
    await page.click('button[type="submit"]');

    await page.waitForURL('/dashboard/action-card');
    await expect(page.locator('h1')).toContainText('Driver Action Card');
    
    // Core Driver Instruction: Routing
    await expect(page.locator('[data-testid="instruction-list"]')).toContainText('Mandatory Bypass: Highway 41');
    // Ensure they DON'T see Medic-specific technical noise (low overload)
    await expect(page.locator('body')).not.toContainText('Triage-Point B Setup');

    // 2. MEDIC VIEW (Separate session)
    // Medics focus on trauma protocols and distribution points.
    const medicPage = await context.newPage();
    await medicPage.goto('/auth/signin');
    await medicPage.fill('input[name="email"]', 'sara-medic@ngo-core.org');
    await medicPage.click('button[type="submit"]');

    await medicPage.waitForURL('/dashboard/action-card');
    await expect(medicPage.locator('h1')).toContainText('Medic Action Card');
    
    // Core Medic Instruction: Setup
    await expect(medicPage.locator('[data-testid="instruction-list"]')).toContainText('Triage-Point B Setup');
    // Ensure they DON'T see Driver-specific engine/tire check noise (low overload)
    await expect(medicPage.locator('body')).not.toContainText('Tire Pressure Check');

    // 3. READINESS PERSISTENCE
    // Both roles should have their own specific verification gates
    await expect(medicPage.locator('[data-testid="role-verification-gate"]')).toBeVisible();
    await page.bringToFront();
    await expect(page.locator('[data-testid="role-verification-gate"]')).toBeVisible();
  });
});
```
