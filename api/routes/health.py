"""
Module: health.py

Purpose:
Provides API endpoints and server routes for health.py within the Hephaestus web service layer.

Responsibilities:
- Handles specific `health.py` domain logic
- Integrates seamlessly with sibling modules
- Adheres strictly to Hephaestus governance constraints

Part of: Hephaestus Governance Engine

Health-check endpoint."""

from __future__ import annotations

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/api/health")
async def health_check() -> dict[str, str]:
    """Return a simple health status.

    Returns:
        ``{"status": "ok", "version": "0.1.0", "service": "hephaestus-api"}``
    """
    return {
        "status": "ok",
        "version": "0.1.0",
        "service": "hephaestus-api",
    }

